"""Compare two .apkg files note by note (guid + fields). Used before/after rebuilding an authored deck.

  python3 scripts/authored-apkg-diff.py <shipped.apkg> <rebuilt.apkg>
"""
import sqlite3
import sys
import tempfile
import zipfile
from pathlib import Path


def notes(apkg: str) -> dict[str, str]:
    with tempfile.TemporaryDirectory() as tmp:
        with zipfile.ZipFile(apkg) as zf:
            name = next(n for n in ("collection.anki21", "collection.anki2") if n in zf.namelist())
            zf.extract(name, tmp)
        con = sqlite3.connect(Path(tmp) / name)
        rows = dict(con.execute("select guid, flds from notes"))
        con.close()
    return rows


def main() -> None:
    old, new = notes(sys.argv[1]), notes(sys.argv[2])
    gone = sorted(set(old) - set(new))
    added = sorted(set(new) - set(old))
    changed = sorted(g for g in set(old) & set(new) if old[g] != new[g])
    print(f"shipped {len(old)} · rebuilt {len(new)} · same {len(set(old) & set(new)) - len(changed)}"
          f" · changed {len(changed)} · removed {len(gone)} · added {len(added)}")
    for label, guids, src in (("changed", changed, new), ("removed", gone, old), ("added", added, new)):
        for g in guids[:8]:
            print(f"  {label} {g}: {src[g].split(chr(31))[0][:110]}")


if __name__ == "__main__":
    main()
