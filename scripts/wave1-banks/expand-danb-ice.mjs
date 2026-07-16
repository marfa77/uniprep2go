import fs from "node:fs";
import { makeQ, rot } from "./write-helper.mjs";

const examSlug = "danb-ice-readiness-check";
const file = new URL(`../../src/data/mock-exams/${examSlug}.json`, import.meta.url);
let data = JSON.parse(fs.readFileSync(file, "utf8"));
if (data.length !== 40) throw new Error(`expected 40, got ${data.length}`);

/** @type {Record<string, import("./write-helper.mjs") extends never ? never : any>} */
const topics = {
  "standard-precautions": [
    [
      "When should gloves be changed during patient care in dentistry?",
      "Between patients and whenever torn/contaminated during a procedure per protocol",
      [
        "Only at the end of the workday",
        "Never if using the same brand of gloves",
        "Only when the patient requests it",
      ],
      "Gloves are single-use barriers; change between patients and when integrity is compromised.",
      ["End-of-day reuse is unsafe.", "Brand does not allow reuse.", "Patient preference is not the standard."],
      "easy",
    ],
    [
      "Hand hygiene is required:",
      "Before donning gloves and after removing gloves, and whenever hands are visibly soiled",
      ["Only after lunch", "Never if gloves will be worn", "Only once each morning"],
      "Hand hygiene is the core of standard precautions and is needed around glove use.",
      ["Meal timing is insufficient.", "Gloves do not replace hand hygiene.", "Once daily is inadequate."],
      "easy",
    ],
    [
      "A surgical mask in dentistry is primarily intended to:",
      "Protect mucous membranes of the wearer from splash/spatter and reduce droplet exposure",
      [
        "Sterilize the operatory air",
        "Replace high-volume evacuation",
        "Allow reuse all week if not wet",
      ],
      "Masks are PPE for splash/droplet; they are not sterilizers and are not week-long single items.",
      [
        "Masks do not sterilize rooms.",
        "HVE is a separate control.",
        "Masks are typically changed when wet/soiled or between patients per protocol.",
      ],
      "medium",
    ],
    [
      "Eye protection should be worn:",
      "When splash or spatter of blood/saliva is reasonably anticipated",
      ["Only during panoramic imaging", "Never with patients under 18", "Only if the dentist asks once a year"],
      "Standard precautions call for eye protection with anticipated splash/spatter.",
      ["Not limited to panoramic.", "Age is irrelevant.", "Annual asks are not the rule."],
      "medium",
    ],
    [
      "If a glove tears mid-procedure, the correct approach is generally to:",
      "Remove gloves, perform hand hygiene, and don new gloves before continuing",
      [
        "Continue carefully with the torn glove",
        "Tape the tear and finish the appointment",
        "Switch to bare hands for better tactile sense",
      ],
      "Compromised gloves must be replaced after hand hygiene.",
      ["Torn gloves fail as barriers.", "Tape is not PPE repair.", "Bare hands increase exposure."],
      "hard",
    ],
  ],
  "instrument-processing": [
    [
      "The correct sequence for instrument reprocessing typically starts with:",
      "Holding/cleaning (or cleaning) before sterilization",
      [
        "Sterilizing first, then washing",
        "Skipping cleaning if instruments look clean",
        "Oil sterilizing all plastics at 400°C",
      ],
      "Soil must be removed before sterilization can be reliable.",
      ["Dirty sterilize is invalid.", "Visual clean is not enough alone.", "Extreme temps can destroy devices."],
      "easy",
    ],
    [
      "Ultrasonic cleaners are used to:",
      "Remove debris via cavitation before packaging/sterilization",
      [
        "Sterilize instruments to SAL 10^-6 by themselves",
        "Replace autoclaves for implant kits always",
        "Disinfect operatory counters",
      ],
      "Ultrasonics clean; they do not replace sterilizers.",
      ["Not a sterilizer alone.", "Autoclaves still required.", "Not for counters primarily."],
      "medium",
    ],
    [
      "Chemical indicators on packs primarily show:",
      "That sterilizer process conditions for that indicator type were met — not that items are proven sterile by the indicator alone",
      [
        "That instruments are definitely sterile forever",
        "Patient name and date of birth",
        "That ultrasonic cleaning finished",
      ],
      "Indicators monitor process conditions; biologic monitoring verifies sterilizer performance on a schedule.",
      [
        "Sterility assurance needs more than one chemical mark.",
        "Not demographics.",
        "Not ultrasonic completion.",
      ],
      "hard",
    ],
    [
      "Hinged instruments should generally be:",
      "Sterilized in the open/unlocked position so sterilant contacts all surfaces",
      [
        "Wired tightly closed for the cycle",
        "Left dripping wet without drying when packaged",
        "Stored closed in sealed pouches while wet",
      ],
      "Open position improves sterilant contact on hinges.",
      ["Closed traps debris/sterilant path.", "Moisture packaging risks wet packs.", "Wet storage is poor practice."],
      "medium",
    ],
    [
      "A wet pack after a steam cycle should be:",
      "Considered compromised for sterility assurance and reprocessed per protocol",
      [
        "Used immediately because moisture proves sterilization",
        "Placed under a fan in the operatory for patients",
        "Opened and air-dried then used without re-sterilizing",
      ],
      "Wet packs can wick contaminants; reprocess.",
      [
        "Moisture is not proof of sterility.",
        "OR fans are not the fix.",
        "Opening then using without re-sterile is unsafe.",
      ],
      "hard",
    ],
  ],
  environmental: [
    [
      "Clinical contact surfaces that may be contaminated should be:",
      "Barrier-protected and/or cleaned and disinfected between patients with an appropriate EPA-registered product",
      [
        "Wiped with plain water only once a week",
        "Ignored if they look shiny",
        "Covered with patient bibs reused all day",
      ],
      "CDC/OSAP-aligned practice: barriers and/or disinfection between patients.",
      [
        "Water weekly is inadequate.",
        "Appearance is not a standard.",
        "Reuse of contaminated covers is unsafe.",
      ],
      "easy",
    ],
    [
      "Housekeeping surfaces (floors, walls) typically require:",
      "Routine cleaning; more frequent disinfection when visibly soiled with blood/body fluids",
      [
        "Sterilization after every patient",
        "No cleaning in dental offices",
        "Autoclaving mop heads between each operatory",
      ],
      "Housekeeping surfaces are cleaned routinely; intensive disinfection when soiled.",
      ["Not sterilized like instruments.", "Cleaning is required.", "Autoclaving mops each room is not standard."],
      "medium",
    ],
    [
      "Dental unit waterlines should be maintained so water quality:",
      "Meets dental water standards (e.g., ≤500 CFU/mL heterotrophic bacteria for non-surgical use) via flushing/treatment protocols",
      [
        "Can be ignored if water tastes fine",
        "Needs no monitoring once the unit is installed",
        "Is only checked once per career",
      ],
      "Waterline biofilms need active management and monitoring.",
      ["Taste is not a metric.", "Installation alone is insufficient.", "Ongoing QC is expected."],
      "hard",
    ],
    [
      "Regulated medical waste (e.g., sharps) must be:",
      "Placed in appropriate puncture-resistant containers and handled per OSHA/state rules",
      [
        "Dropped loosely in regular trash if capped",
        "Taken home by staff for disposal",
        "Flushed down the operatory sink",
      ],
      "Sharps and regulated waste have specific containment/disposal rules.",
      ["Loose trash is illegal/unsafe.", "Home disposal is prohibited.", "Sinks are not sharps disposal."],
      "easy",
    ],
    [
      "After a blood spill on a counter, you should:",
      "Contain, clean, and disinfect with an appropriate intermediate-level disinfectant per protocol",
      [
        "Wipe once with a dry paper towel only",
        "Spray perfume to mask odor",
        "Ignore if smaller than a coin",
      ],
      "Blood spills need proper cleaning/disinfection.",
      ["Dry wipe is insufficient.", "Odor control is irrelevant.", "Size does not waive cleaning."],
      "medium",
    ],
  ],
  occupational: [
    [
      "The OSHA Bloodborne Pathogens Standard requires employers to:",
      "Establish an exposure control plan and offer HBV vaccination to at-risk employees",
      [
        "Ban all gloves to save cost",
        "Prohibit reporting of needlesticks",
        "Require employees to buy their own sharps containers",
      ],
      "Exposure control plans and HBV offers are core OSHA BBP elements.",
      ["PPE is required, not banned.", "Reporting is required.", "Employer provides engineering controls."],
      "medium",
    ],
    [
      "After a needlestick, the injured worker should generally:",
      "Wash the site, report promptly, and follow post-exposure evaluation protocol",
      [
        "Hide the incident to avoid paperwork",
        "Squeeze the wound vigorously for 10 minutes then continue working",
        "Wait a week to see if infection appears before reporting",
      ],
      "Prompt first aid, reporting, and evaluation matter for prophylaxis timing.",
      [
        "Hiding violates policy/safety.",
        "Aggressive squeezing is not recommended practice.",
        "Delay risks missing PEP windows.",
      ],
      "hard",
    ],
    [
      "Engineering controls examples include:",
      "Sharps containers and safer needle devices",
      [
        "Hoping staff remember to be careful only",
        "Playing music loudly",
        "Turning off operatory lights",
      ],
      "Engineering controls remove hazards at the source.",
      ["Work practice alone is not engineering control.", "Music is unrelated.", "Lights are unrelated."],
      "easy",
    ],
    [
      "Nitrous oxide occupational exposure is best reduced by:",
      "Scavenging systems, good ventilation, and equipment checks for leaks",
      [
        "Running nitrous without scavenger all day",
        "Holding the mask loosely away from the patient always",
        "Ignoring odor because N2O is harmless at any level",
      ],
      "Scavenging/ventilation reduce chronic exposure.",
      [
        "No scavenger increases exposure.",
        "Poor mask fit leaks.",
        "Chronic exposure is a recognized concern.",
      ],
      "medium",
    ],
    [
      "Employees with latex allergy risk should:",
      "Use appropriate non-latex alternatives and follow facility allergy protocols",
      [
        "Double latex gloves for more protection",
        "Powder latex gloves more heavily",
        "Avoid reporting symptoms",
      ],
      "Avoidance of latex and proper alternatives are key.",
      [
        "More latex worsens exposure.",
        "Powder increases aerosolized allergen.",
        "Reporting enables accommodations.",
      ],
      "medium",
    ],
  ],
};

function insertAfterTopic(bank, topicId, newQs) {
  let last = -1;
  for (let i = 0; i < bank.length; i++) if (bank[i].topicId === topicId) last = i;
  if (last < 0) throw new Error(`missing topic ${topicId}`);
  return [...bank.slice(0, last + 1), ...newQs, ...bank.slice(last + 1)];
}

const original = structuredClone(data);
for (const [topicId, rows] of Object.entries(topics)) {
  const newQs = rows.map((row, i) => makeQ(examSlug, topicId, 11 + i, row, rot(10 + i)));
  data = insertAfterTopic(data, topicId, newQs);
}
if (data.length !== 60) throw new Error(`got ${data.length}`);
for (const oq of original) {
  const match = data.find((x) => x.id === oq.id);
  if (JSON.stringify(match) !== JSON.stringify(oq)) throw new Error(`mutated ${oq.id}`);
}
fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log("danb-ice", data.length);
