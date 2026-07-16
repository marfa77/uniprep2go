#!/usr/bin/env python3
"""NBRC TMC Respiratory Therapist — 60 curated MCQs (4×15)."""
from write_helper import write_bank

SLUG = "nbrc-tmc-readiness-check"

topics = {
    "patient-data": [
        (
            "A PaO2 of 55 mm Hg on room air most closely indicates:",
            "Hypoxemia",
            [
                "Hyperoxia",
                "Normal oxygenation for a healthy young adult",
                "Metabolic alkalosis only",
            ],
            "PaO2 below ~60 mm Hg reflects clinically important hypoxemia; normal room-air PaO2 is roughly 80–100 mm Hg.",
            [
                "Hyperoxia is elevated oxygen tension.",
                "55 mm Hg is below normal adult PaO2.",
                "PaO2 alone does not define metabolic alkalosis.",
            ],
            "easy",
        ),
        (
            "An elevated PaCO2 with acidemia is consistent with:",
            "Respiratory acidosis (acute or chronic depending on HCO3− compensation)",
            [
                "Respiratory alkalosis",
                "Metabolic alkalosis as the primary process always",
                "Normal acid–base balance",
            ],
            "CO2 retention lowers pH (respiratory acidosis); metabolic compensation raises HCO3− over time.",
            [
                "Low PaCO2 causes respiratory alkalosis.",
                "Primary metabolic alkalosis raises HCO3−/pH patterns differently.",
                "Acidemia with high CO2 is not normal.",
            ],
            "easy",
        ),
        (
            "The A-a oxygen gradient widens with:",
            "V/Q mismatch, shunt, or diffusion limitation",
            [
                "Perfect matching of ventilation and perfusion only",
                "Breathing room air at sea level with normal lungs only",
                "Hyperventilation in normal lungs exclusively decreasing A-a",
            ],
            "Widened A-aDO2 suggests pulmonary gas-exchange inefficiency rather than pure hypoventilation.",
            [
                "Ideal V/Q keeps A-a relatively normal.",
                "Normal lungs have a small A-a gradient.",
                "Hyperventilation alone does not create a large A-a like shunt does.",
            ],
            "medium",
        ),
        (
            "A sudden drop in SpO2 with unilateral absence of breath sounds after central line placement suggests:",
            "Possible pneumothorax—assess and notify the team urgently",
            [
                "Improved lung recruitment",
                "Normal finding after all line placements",
                "Need to increase tidal volume blindly without assessment",
            ],
            "Iatrogenic pneumothorax can follow subclavian/internal jugular attempts; asymmetric exam is a red flag.",
            [
                "Recruitment would not silence one side suddenly.",
                "This is not a normal expected finding.",
                "Blind VT increases can worsen pneumothorax.",
            ],
            "medium",
        ),
        (
            "Peak inspiratory pressure (PIP) rising with unchanged tidal volume may indicate:",
            "Decreased compliance or increased airway resistance",
            [
                "Improved compliance always",
                "Disconnected ventilator circuit",
                "Guaranteed resolution of bronchospasm",
            ],
            "Higher pressure for the same volume means the respiratory system is stiffer or more resistive.",
            [
                "Improved compliance lowers pressures.",
                "Disconnection typically drops pressures/volumes.",
                "Bronchospasm raises resistive pressures.",
            ],
            "easy",
        ),
        (
            "Plateau pressure (Pplat) best reflects:",
            "Alveolar pressure related to tidal volume and respiratory system compliance (no flow)",
            [
                "Only airway resistance during peak flow",
                "Atmospheric pressure at the mouth always",
                "FiO2 setting",
            ],
            "Inspiratory hold (zero flow) yields Pplat used for compliance and lung-protective limits.",
            [
                "PIP includes resistive pressure; Pplat does not.",
                "Mouth pressure during hold approximates alveolar pressure, not always Patm.",
                "FiO2 is independent of Pplat.",
            ],
            "medium",
        ),
        (
            "A patient with suspected CO poisoning may show:",
            "Normal or high SpO2 readings that do not reflect true oxygen content—use CO-oximetry",
            [
                "Pulse oximetry that always detects CO accurately",
                "No need for ABG/CO-oximetry ever",
                "Cyanosis that pulse oximeters quantify as COHb%",
            ],
            "Standard SpO2 cannot reliably distinguish oxyhemoglobin from carboxyhemoglobin; CO-oximetry measures COHb.",
            [
                "Pulse ox is misleading in CO poisoning.",
                "CO-oximetry is indicated.",
                "SpO2 does not report COHb%.",
            ],
            "hard",
        ),
        (
            "Dull percussion and bronchial breath sounds over a lung region suggest:",
            "Consolidation (e.g., pneumonia) more than pneumothorax",
            [
                "Large pneumothorax with hyperresonance",
                "Normal aerated lung in all cases",
                "Pleural effusion with hyperresonance always",
            ],
            "Consolidation increases transmission of bronchial sounds and dulls percussion; pneumothorax is hyperresonant with decreased sounds.",
            [
                "Pneumothorax is hyperresonant with ↓ sounds.",
                "These findings are abnormal.",
                "Effusions are dull but breath sounds are usually diminished, not bronchial.",
            ],
            "medium",
        ),
        (
            "An SBT readiness screen commonly includes:",
            "Adequate oxygenation, hemodynamic stability, and resolution of the indication for ventilation (conceptually)",
            [
                "FiO2 1.0 and PEEP 20 as ideal readiness",
                "Uncontrolled shock as a green light",
                "pH 7.10 with rising PaCO2 as ideal",
            ],
            "Liberation readiness requires gas exchange and clinical stability sufficient to trial spontaneous breathing.",
            [
                "High FiO2/PEEP suggest ongoing failure.",
                "Shock precludes readiness.",
                "Severe acidosis/hypoventilation are contraindications.",
            ],
            "medium",
        ),
        (
            "A restrictive spirometry pattern typically shows:",
            "Reduced FVC with FEV1/FVC normal or high",
            [
                "Obstruction with FEV1/FVC markedly reduced as the only pattern possible",
                "Increased TLC in pure restriction",
                "Normal volumes with no change ever",
            ],
            "Restriction lowers volumes; the FEV1/FVC ratio is preserved/elevated, unlike obstruction.",
            [
                "Low FEV1/FVC defines obstruction.",
                "Restriction lowers TLC.",
                "Restriction changes volumes.",
            ],
            "medium",
        ),
        (
            "Pedal edema, elevated JVP, and loud P2 in a COPD patient suggest possible:",
            "Cor pulmonale / pulmonary hypertension complications",
            [
                "Simple dehydration only",
                "Guaranteed normal right heart pressures",
                "Left-lower-lobe pneumonia exclusively",
            ],
            "Chronic lung disease can cause pulmonary hypertension and right-heart strain with systemic congestion signs.",
            [
                "Edema/JVP elevation are not pure dehydration signs here.",
                "Findings suggest elevated right-sided pressures.",
                "Pneumonia alone does not explain this constellation.",
            ],
            "hard",
        ),
        (
            "Capnography showing a sudden drop of ETCO2 to near zero may indicate:",
            "Circuit disconnection, esophageal intubation, or catastrophic drop in pulmonary blood flow",
            [
                "Improved alveolar ventilation only",
                "Normal steady-state ventilation",
                "Sensor working with rising CO2 production only",
            ],
            "Abrupt ETCO2 loss is an emergency signal for airway/circuit failure or circulatory collapse.",
            [
                "Improved ventilation lowers ETCO2 gradually, not to zero suddenly from airway loss patterns.",
                "Steady state has a waveform.",
                "Rising production increases ETCO2.",
            ],
            "hard",
        ),
        (
            "Hemodynamic data: low CVP, low PCWP, and low cardiac output suggest:",
            "Hypovolemia",
            [
                "Fluid overload with high filling pressures",
                "Left ventricular failure with high PCWP",
                "Normal euvolemia with high output",
            ],
            "Low filling pressures with low output fit volume depletion; LV failure typically elevates PCWP.",
            [
                "Overload raises filling pressures.",
                "LV failure → high PCWP.",
                "Low output is not high-output euvolemia.",
            ],
            "hard",
        ),
        (
            "A patient with Guillain-Barré is monitored with vital capacity (VC) and NIF because:",
            "Declining VC/NIF can signal impending ventilatory failure",
            [
                "These tests measure only kidney function",
                "Guillain-Barré never affects respiration",
                "Spirometry replaces all neurologic exams forever",
            ],
            "Neuromuscular weakness progresses to hypoventilation; serial respiratory muscle metrics guide ICU timing.",
            [
                "VC/NIF are respiratory muscle tests.",
                "GBS commonly threatens respiration.",
                "Neuro exam remains essential.",
            ],
            "medium",
        ),
        (
            "Methemoglobin clinically may present with:",
            "Cyanosis and chocolate-brown blood with SpO2/PaO2 discrepancies—confirm with CO-oximetry",
            [
                "Bright cherry-red skin pathognomonic for methemoglobin only",
                "No effect on oxygen carrying",
                "Automatic resolution by increasing room-air only always",
            ],
            "MetHb impairs oxygen delivery; methylene blue may be used clinically—diagnosis needs CO-oximetry.",
            [
                "Cherry-red is classically associated with CO, not MetHb.",
                "MetHb reduces functional oxygen carrying.",
                "Significant MetHb needs specific therapy, not just room air.",
            ],
            "hard",
        ),
    ],
    "equipment": [
        (
            "A nebulizer that sputters and delivers little aerosol most likely needs:",
            "Checking solution volume, connections, gas flow, and for clogs",
            [
                "Increasing patient anxiety as the fix",
                "Removing the mouthpiece permanently",
                "Setting flow to zero",
            ],
            "Aerosol output depends on adequate volume, intact circuitry, and proper driving flow.",
            [
                "Anxiety does not fix devices.",
                "Interface is needed for delivery.",
                "Zero flow stops aerosol.",
            ],
            "easy",
        ),
        (
            "Oxygen blender failure to a set FiO2 should prompt:",
            "Verification with an oxygen analyzer and troubleshooting gas supplies/blender",
            [
                "Assuming the dial is always accurate without checks",
                "Ignoring patient SpO2 changes",
                "Replacing ABG machines only",
            ],
            "Analyzers confirm delivered FiO2; air/O2 supply pressures affect blender output.",
            [
                "Dials can be wrong if blender/supply fails.",
                "SpO2 changes are clinical clues.",
                "ABG machines do not fix blenders.",
            ],
            "medium",
        ),
        (
            "A galvanic fuel-cell O2 analyzer reads inaccurately if:",
            "The fuel cell is depleted or the device is not calibrated to known gases",
            [
                "It is calibrated to 21% and 100% appropriately always forever without aging",
                "Batteries are irrelevant in all analyzer types",
                "Room air is 100% oxygen",
            ],
            "Fuel cells age; calibration to known O2 concentrations maintains accuracy.",
            [
                "Cells deplete and need replacement/calibration.",
                "Power/electronics matter for many devices.",
                "Room air is ~21% O2.",
            ],
            "medium",
        ),
        (
            "Heated wire circuits on ventilators primarily help:",
            "Reduce condensate in the inspiratory limb and maintain humidified gas temperature",
            [
                "Eliminate the need for any humidification system",
                "Cool inspired gas to freezing",
                "Replace HEPA filtration always",
            ],
            "Heated wires limit rainout while delivering warm humidified gas to artificial airways.",
            [
                "Humidifiers are still required.",
                "Goal is warm, not freezing, gas.",
                "Filters serve infection-control roles separately.",
            ],
            "easy",
        ),
        (
            "A sudden ventilator low-pressure alarm most commonly suggests:",
            "Leak or disconnection in the patient circuit",
            [
                "Patient biting the tube causing high pressure only",
                "Kinked ET tube causing high pressure only",
                "Improved seal with zero leaks",
            ],
            "Low-pressure/low-VT alarms flag leaks, disconnections, or inadequate delivered pressure.",
            [
                "Biting/kinks typically cause high-pressure alarms.",
                "Kinks → high pressure.",
                "Zero leaks would not trigger low-pressure alarms.",
            ],
            "easy",
        ),
        (
            "High-pressure ventilator alarms may be caused by:",
            "Coughing, secretions, biting, bronchospasm, or decreased compliance",
            [
                "Circuit disconnection only",
                "Expiratory valve removal only as low pressure",
                "FiO2 set to 0.21 only",
            ],
            "Anything raising impedance to inflation can trigger high-pressure limits.",
            [
                "Disconnection → low pressure.",
                "Major leaks → low pressure.",
                "FiO2 alone does not set PIP alarms.",
            ],
            "easy",
        ),
        (
            "Capnograph calibration/quality issues include:",
            "Sensor contamination, loose connections, and need for periodic zero/span checks per device",
            [
                "Never needing any verification",
                "Using it underwater routinely",
                "Ignoring flatline waveforms during intubation checks",
            ],
            "ETCO2 devices require maintenance; waveform interpretation depends on valid sensors.",
            [
                "Verification is part of QC.",
                "Sensors are not for underwater use.",
                "Flatline during intubation is a critical clue—not ignored.",
            ],
            "medium",
        ),
        (
            "A pulse oximeter probe reading poorly on a cold, vasoconstricted finger may improve by:",
            "Warming the site or using an alternate site/probe designed for low perfusion",
            [
                "Clamping the probe harder until pain guarantees accuracy",
                "Trusting a flat SpO2 of 50% without clinical correlation",
                "Painting nails with opaque polish and ignoring artifacts",
            ],
            "Perfusion and probe placement affect SpO2 accuracy; correlate with clinical picture/ABG when needed.",
            [
                "Painful clamping is inappropriate.",
                "Implausible values need verification.",
                "Polish can artifactually affect readings.",
            ],
            "easy",
        ),
        (
            "Autoclaving or improper chemical exposure of reusable devices can:",
            "Damage equipment—follow manufacturer sterilization IFUs",
            [
                "Always improve calibration automatically",
                "Be ignored because all plastics tolerate any sterilant",
                "Replace the need for cleaning soil first",
            ],
            "IFUs specify compatible disinfection/sterilization; soil must be cleaned before sterilization.",
            [
                "Damage can ruin calibration/function.",
                "Material compatibility varies.",
                "Cleaning precedes sterilization.",
            ],
            "medium",
        ),
        (
            "An oxygen concentrator that fails to reach specified O2 purity should be:",
            "Removed from service and repaired/replaced; verify with analyzer",
            [
                "Left in use for COPD patients indefinitely",
                "Used as a toy for children",
                "Assumed fine if the compressor is loud",
            ],
            "Substandard purity endangers patients relying on home/long-term O2 systems.",
            [
                "Continued use risks hypoxemia.",
                "Not a toy.",
                "Noise ≠ purity.",
            ],
            "easy",
        ),
        (
            "Wright respirometer (or similar) used for VC/VT measurement requires:",
            "Proper assembly, leak-free connections, and correct patient technique coaching",
            [
                "Blocking the exhalation path completely as standard",
                "No zero reference or observation of needle/digital output",
                "Measuring during cough only for resting VT",
            ],
            "Volume devices need intact circuitry and coached efforts for valid spirometric bedside measures.",
            [
                "Complete blockage prevents measurement/harms patient.",
                "Output must be observed/recorded.",
                "Cough volumes are not resting VT.",
            ],
            "medium",
        ),
        (
            "Heliox delivery systems require attention to:",
            "Correct gas mixture, appropriately calibrated flow devices, and airway/device compatibility",
            [
                "Using air-calibrated flowmeters without correction factors when required",
                "Ignoring mixture labels",
                "Delivering heliox through devices never approved/assessed for low-density gas",
            ],
            "Low-density heliox alters flowmeter behavior and may affect some nebulizers/ventilators.",
            [
                "Corrections/special meters are often needed.",
                "Labels identify mixture (e.g., 80/20).",
                "Device compatibility matters.",
            ],
            "hard",
        ),
        (
            "Battery-powered suction devices for transport should be checked for:",
            "Charge status, vacuum capability, and canister/tubing readiness",
            [
                "Color of the carrying case only",
                "Whether they play music",
                "Skipping checks because transport is short",
            ],
            "Transport emergencies need functioning suction regardless of trip length.",
            [
                "Case color is irrelevant.",
                "Music is not a clinical function.",
                "Short trips still need readiness.",
            ],
            "easy",
        ),
        (
            "A false-high cuff pressure reading may result from:",
            "Measuring while the patient is coughing or using a faulty gauge",
            [
                "Always reflecting true tracheal mucosal pressure perfectly",
                "Deflating the cuff completely as a measurement method for pressure",
                "Disconnecting the pilot balloon permanently",
            ],
            "Cuff pressure should be measured at rest with a functioning manometer; goals avoid under-/overinflation.",
            [
                "Dynamic conditions distort readings.",
                "Deflation measures nothing useful for pressure.",
                "Pilot disconnection prevents cuff management.",
            ],
            "medium",
        ),
        (
            "Quality control for blood gas analyzers includes:",
            "Running control materials, documenting results, and corrective action when out of range",
            [
                "Never running controls",
                "Reporting patient results when controls fail without investigation",
                "Using expired reagents routinely",
            ],
            "CLIA-style QC principles apply: controls, documentation, and troubleshooting before reporting.",
            [
                "Controls are mandatory.",
                "Failed QC blocks patient reporting.",
                "Expired reagents threaten accuracy.",
            ],
            "easy",
        ),
    ],
    "therapeutics": [
        (
            "Indications for oxygen therapy include:",
            "Documented hypoxemia or clinical conditions with high risk of hypoxemia",
            [
                "Routine use to treat anxiety without assessment forever",
                "Treating hyperoxia intentionally in all neonates without limits",
                "Replacing ventilation in apnea",
            ],
            "O2 treats hypoxemia; it does not ventilate and excess O2 has risks (e.g., neonates, COPD drive debates—titrate).",
            [
                "Anxiety needs appropriate assessment/therapy.",
                "Neonates need careful O2 targeting.",
                "Apnea needs ventilation/airway support.",
            ],
            "easy",
        ),
        (
            "A simple mask typically delivers approximately:",
            "Moderate FiO2 that varies with fit and flow—often roughly 0.35–0.50 range conceptually",
            [
                "Exact FiO2 1.0 like a tight nonrebreather always",
                "Room air only at 15 L/min",
                "Heliox 80/20 exclusively",
            ],
            "Simple masks provide variable moderate FiO2; NRBs approach higher FiO2 with good fit/flow.",
            [
                "NRB/high-flow systems differ.",
                "Adequate flow raises FiO2 above room air.",
                "Heliox needs specific setups.",
            ],
            "easy",
        ),
        (
            "Incentive spirometry is primarily used to:",
            "Encourage sustained maximal inspiration to prevent/treat atelectasis",
            [
                "Deliver aerosolized antibiotics automatically",
                "Measure ABGs",
                "Replace CPAP for OSA at home always",
            ],
            "IS coaches lung expansion after surgery/immobility; technique and frequency matter.",
            [
                "IS is not a nebulizer.",
                "ABGs need blood sampling/analyzers.",
                "OSA therapy is typically CPAP/BiPAP ordered clinically.",
            ],
            "easy",
        ),
        (
            "PEP therapy helps by:",
            "Providing expiratory resistance to stent airways and improve secretion clearance/recruitment",
            [
                "Eliminating the need to cough ever",
                "Causing mandatory pneumothorax in all users",
                "Replacing inhaled bronchodilators for all asthma forever",
            ],
            "PEP/OPEP devices aid airway clearance adjunctively with coughing and hydration as appropriate.",
            [
                "Cough remains important.",
                "Pneumothorax is a risk in select patients—not a goal.",
                "Bronchodilators remain key in bronchospasm.",
            ],
            "medium",
        ),
        (
            "NPPV (BiPAP) for COPD exacerbation is contraindicated when:",
            "Respiratory arrest, inability to protect airway, or untreated pneumothorax (among classic contraindications)",
            [
                "Mild hypercapnia with alert cooperative patient always",
                "Patient preference for a mask trial when appropriate",
                "pH 7.30 with intact mentation as an absolute ban always",
            ],
            "NPPV needs a spontaneously breathing, protectable airway; arrest/aspiration risk needs intubation pathway.",
            [
                "Mild hypercapnia is a common NPPV indication.",
                "Appropriate trials are used clinically.",
                "Many guidelines support NPPV at that pH if mentation allows.",
            ],
            "medium",
        ),
        (
            "Lung-protective ventilation in ARDS targets:",
            "Lower tidal volumes (e.g., ~6 mL/kg PBW) and limited plateau pressures",
            [
                "VT 12–15 mL/kg always",
                "Pplat unrestricted above 40 cm H2O as a goal",
                "Zero PEEP in all severe shunts",
            ],
            "ARDSnet-style strategies reduce volutrauma with low VT and Pplat limits plus appropriate PEEP.",
            [
                "High VT increases mortality risk in ARDS.",
                "High Pplat risks overdistension.",
                "PEEP is used to support oxygenation/recruitment.",
            ],
            "medium",
        ),
        (
            "Albuterol is primarily a:",
            "Short-acting β2-agonist bronchodilator",
            [
                "Loop diuretic",
                "Anticholinergic only",
                "Systemic corticosteroid",
            ],
            "SABA therapy relaxes bronchial smooth muscle for bronchospasm relief.",
            [
                "Diuretics are different class.",
                "Ipratropium is anticholinergic.",
                "Steroids are anti-inflammatory, not SABA.",
            ],
            "easy",
        ),
        (
            "Inhaled hypertonic saline is used in some patients to:",
            "Hydrate airway mucus and facilitate clearance (e.g., select CF care pathways)",
            [
                "Treat hypernatremia as an IV fluid",
                "Replace all antibiotics",
                "Cure pulmonary embolism",
            ],
            "Hypertonic saline is an airway clearance adjunct in appropriate protocols—not systemic sodium repair via nebulizer intent.",
            [
                "IV saline treats systemic sodium/volume issues.",
                "Antibiotics treat infection.",
                "PE needs anticoagulation/reperfusion strategies.",
            ],
            "medium",
        ),
        (
            "Recruitment maneuvers and high PEEP strategies require caution because they may cause:",
            "Hypotension and barotrauma in susceptible patients",
            [
                "Guaranteed improvement without risks",
                "Lower pleural pressures only with no hemodynamics effect",
                "Automatic weaning success",
            ],
            "Increased intrathoracic pressure can reduce venous return; overdistension risks pneumothorax.",
            [
                "Risks are real and monitored.",
                "Hemodynamics often change.",
                "Recruitment ≠ automatic weaning.",
            ],
            "hard",
        ),
        (
            "Prone positioning in severe ARDS is used to:",
            "Improve oxygenation by redistributing perfusion/ventilation in many patients",
            [
                "Treat only ankle edema",
                "Replace antibiotics for pneumonia always",
                "Guarantee zero facial pressure injuries without skin care",
            ],
            "Proning can improve V/Q in severe ARDS; teams manage lines, airway, and pressure points.",
            [
                "Proning is a lung strategy, not ankle therapy.",
                "Antibiotics still treat infection.",
                "Pressure-injury prevention remains essential.",
            ],
            "medium",
        ),
        (
            "Aerosolized medication delivery during mechanical ventilation is improved by:",
            "Optimal nebulizer/MDI adapter placement, synchronizing when appropriate, and minimizing circuit dead-stock losses per best practice",
            [
                "Placing the nebulizer distal to a heated humidifier rainout swamp without thought always",
                "Turning off all gas flow forever",
                "Never considering bias flow or continuous vs breath-actuated devices",
            ],
            "Device position and ventilator interactions affect inhaled dose; follow evidence-based aerosol practices.",
            [
                "Humidifiers/condensates can reduce delivery.",
                "Flow is needed for jet nebs.",
                "Device type/flow matters.",
            ],
            "hard",
        ),
        (
            "Chest physiotherapy (postural drainage/percussion) is relatively contraindicated in:",
            "Active hemoptysis, unstable spinal injury, or untreated pneumothorax (classic cautions)",
            [
                "Stable patients with retained secretions who benefit",
                "CF patients on approved airway clearance regimens",
                "Patients who tolerate Trendelenburg alternatives when ordered",
            ],
            "External maneuvers can worsen bleeding, fractures, or air leaks—screen contraindications.",
            [
                "Appropriately selected patients benefit.",
                "CF commonly uses airway clearance.",
                "Modified positions may be used when appropriate.",
            ],
            "medium",
        ),
        (
            "The primary goal of bronchial hygiene therapy is to:",
            "Assist removal of retained secretions and improve ventilation/perfusion where secretions impair gas exchange",
            [
                "Raise ICP intentionally in all neuro patients",
                "Replace intubation for complete airway obstruction by foreign body without ALS",
                "Cure interstitial fibrosis permanently",
            ],
            "Clearance therapies target mucus plugging/retention—not structural fibrosis cure or unsafe ICP rises.",
            [
                "Some techniques can raise ICP—caution in neuro injury.",
                "Foreign-body obstruction needs airway algorithms.",
                "Fibrosis is not cured by CPT.",
            ],
            "easy",
        ),
        (
            "When titrating O2 in a patient at risk for hypercapnic respiratory failure, best practice is to:",
            "Target appropriate SpO2 goals and monitor ventilation/ABG as clinically indicated",
            [
                "Always give FiO2 1.0 without monitoring",
                "Withhold all oxygen despite SpO2 70%",
                "Ignore rising PaCO2 and somnolence",
            ],
            "Titrate to goals (often ~88–92% in at-risk COPD per many protocols) while watching for CO2 retention/clinical decline.",
            [
                "Unmonitored pure O2 can be harmful in some patients.",
                "Severe hypoxemia still needs oxygen.",
                "Rising CO2/somnolence need action.",
            ],
            "medium",
        ),
        (
            "Intrapulmonary percussive ventilation (IPV) / high-frequency chest wall devices are used to:",
            "Mobilize secretions as part of an airway clearance program",
            [
                "Measure DLCO",
                "Provide definitive PE thrombolysis",
                "Replace renal dialysis",
            ],
            "High-frequency devices are clearance adjuncts selected by clinical protocol and tolerance.",
            [
                "DLCO is a PF lab test.",
                "PE therapy is pharmacologic/procedural.",
                "Dialysis is renal support.",
            ],
            "easy",
        ),
    ],
    "emergency": [
        (
            "The first action for an unresponsive, apneic patient is to:",
            "Activate emergency response and begin CAB/ABCs with airway opening and ventilation/CPR as indicated",
            [
                "Obtain a full history before any airway action",
                "Start with arterial line placement only",
                "Wait for a chest X-ray before opening the airway",
            ],
            "Basic life support priorities precede advanced diagnostics in arrest/near-arrest.",
            [
                "History can wait seconds that save the brain.",
                "Lines are not first.",
                "Imaging follows stabilization.",
            ],
            "easy",
        ),
        (
            "Suspected tension pneumothorax with hypotension and tracheal deviation needs:",
            "Immediate decompression per emergency protocol and supportive oxygen/ventilation",
            [
                "Incentive spirometry as first-line",
                "Delay until a scheduled clinic visit next week",
                "Only increasing PEEP further without assessment",
            ],
            "Tension physiology is immediately life-threatening; decompression is the priority.",
            [
                "IS is irrelevant in tension PTX.",
                "Delay is deadly.",
                "More PEEP can worsen PTX.",
            ],
            "medium",
        ),
        (
            "Foreign-body airway obstruction with severe signs in a conscious adult is treated with:",
            "Abdominal thrusts (Heimlich) or approved protocol until expulsion/unresponsiveness pathways",
            [
                "Offering water and leaving the patient alone",
                "Blind finger sweeps in all conscious adults routinely",
                "Peak flow measurement first",
            ],
            "Severe FBAO needs immediate dislodgement maneuvers per BLS guidelines.",
            [
                "Leaving is dangerous.",
                "Blind sweeps can worsen obstruction.",
                "Peak flow wastes time.",
            ],
            "easy",
        ),
        (
            "During cardiac arrest, ETCO2 suddenly rises toward normal with ROSC because:",
            "Pulmonary blood flow resumes and delivers CO2 to the lungs",
            [
                "The analyzer always fails at ROSC",
                "Oxygen tanks empty at ROSC",
                "PEEP automatically doubles",
            ],
            "ETCO2 is a surrogate of pulmonary perfusion during CPR; rise suggests ROSC.",
            [
                "Analyzers can be valid markers.",
                "O2 supply is separate.",
                "PEEP is set, not auto-doubled by ROSC.",
            ],
            "medium",
        ),
        (
            "Accidental extubation with inadequate breathing requires:",
            "Airway support with BVM and preparation for reintubation as needed",
            [
                "Ignoring desaturation",
                "Oral feeding immediately",
                "Removing oxygen to stimulate breathing always",
            ],
            "Re-establish oxygenation/ventilation first; then secure a definitive airway.",
            [
                "Desaturation is an emergency.",
                "Feeding risks aspiration.",
                "Removing O2 is harmful.",
            ],
            "easy",
        ),
        (
            "Malignant hyperthermia crisis support includes:",
            "Stopping triggering agents, hyperventilating with 100% O2, and supporting dantrolene/protocol care",
            [
                "Giving more succinylcholine to finish the case",
                "Covering with heavy blankets to raise temperature further",
                "Ignoring rising ETCO2 and rigidity",
            ],
            "MH is a hypermetabolic emergency; anesthesia teams lead dantrolene protocols while RTs support ventilation/cooling logistics.",
            [
                "Succinylcholine is a trigger.",
                "Cooling, not heating, is needed.",
                "Rising ETCO2/rigidity are classic signs.",
            ],
            "hard",
        ),
        (
            "Status asthmaticus deteriorating on NPPV with exhaustion suggests:",
            "Need for intubation/mechanical ventilation with strategy to avoid air trapping",
            [
                "Stopping all bronchodilators",
                "Mandatory high respiratory rates with zero expiratory time",
                "Discharge home",
            ],
            "Fatigue/hypercapnia despite maximal therapy indicates invasive support; vent strategies allow exhalation.",
            [
                "Bronchodilators remain central.",
                "High rates worsen auto-PEEP.",
                "Discharge is inappropriate.",
            ],
            "hard",
        ),
        (
            "Massive hemoptysis initial priorities include:",
            "Airway protection (often bleeding side down), oxygenation, and urgent team/bronchoscopy pathways",
            [
                "Chest PT percussion on the bleeding lung aggressively as first step",
                "Anticoagulation bolus",
                "Incentive spirometry in the hallway alone",
            ],
            "Protect the airway and non-bleeding lung; control bleeding with specialist care.",
            [
                "Percussion can worsen bleeding.",
                "Anticoagulation worsens bleeding.",
                "IS is not the priority.",
            ],
            "hard",
        ),
        (
            "Fire in the OR with an airway fire requires:",
            "Stop ventilation/gases as protocol directs, remove burning tube, extinguish, and re-establish airway/oxygenation",
            [
                "Increase FiO2 to 1.0 into the fire",
                "Continue laser use",
                "Ignore smoke in the airway",
            ],
            "Airway fire algorithms prioritize removing the fuel/oxidizer source and protecting the patient.",
            [
                "High O2 feeds fire.",
                "Energy devices must stop.",
                "Smoke/thermal injury needs management.",
            ],
            "hard",
        ),
        (
            "Auto-PEEP with progressive hypotension on the ventilator may require:",
            "Temporarily disconnecting to allow exhalation / lowering rate and I:E adjustments per protocol",
            [
                "Increasing rate further without assessing auto-PEEP",
                "Ignoring plateau and intrinsic PEEP measurements",
                "Adding more tidal volume immediately",
            ],
            "Severe air trapping impairs venous return; allow exhalation and adjust settings.",
            [
                "Higher rates worsen trapping.",
                "Measurement guides therapy.",
                "Larger VT can worsen hyperinflation.",
            ],
            "hard",
        ),
        (
            "Anaphylaxis with respiratory distress is treated urgently with:",
            "Epinephrine IM (per protocol), airway/oxygen support, and emergency activation",
            [
                "Delayed observation only for stridor",
                "Oral antihistamine as the only drug for anaphylactic shock",
                "Removing IV access permanently first",
            ],
            "IM epinephrine is first-line for anaphylaxis; airway support is concurrent.",
            [
                "Stridor needs immediate action.",
                "Antihistamines are adjuncts, not sole shock therapy.",
                "IV access is needed for resuscitation.",
            ],
            "medium",
        ),
        (
            "Post-intubation deterioration with asymmetric chest rise after clavicle line placement suggests:",
            "Mainstem intubation or pneumothorax—assess, auscultate, adjust tube depth, image/decompress as indicated",
            [
                "Normal equal ventilation",
                "Need to add a bite block only",
                "Immediate oral diet",
            ],
            "Acute asymmetry after intubation/central lines demands rapid differentiation of tube malposition vs PTX.",
            [
                "Asymmetry is abnormal.",
                "Bite blocks do not fix PTX/mainstem.",
                "Diet is irrelevant.",
            ],
            "medium",
        ),
        (
            "Hyperkalemia with ECG changes may need respiratory therapy support for:",
            "Ventilatory support if arrest/respiratory failure occurs while medical therapy (calcium, shifts) proceeds",
            [
                "Routine incentive spirometry as definitive K+ removal",
                "Heliox as first-line for hyperkalemia",
                "Stopping all cardiac monitors",
            ],
            "RTs manage airway/ventilation emergencies while medical teams shift/remove potassium.",
            [
                "IS does not lower K+.",
                "Heliox is for airway obstruction contexts.",
                "Monitoring is essential.",
            ],
            "medium",
        ),
        (
            "Disaster/mass-casualty oxygen allocation planning emphasizes:",
            "Titrating O2 to clinically appropriate targets and conserving resources with triage frameworks",
            [
                "Giving every victim FiO2 1.0 indefinitely without assessment",
                "Hoarding all cylinders unused while patients desaturate",
                "Disabling pulse oximeters to save batteries only",
            ],
            "Crisis standards still aim for best outcomes with limited O2—assessment and titration matter.",
            [
                "Blind 100% wastes supply and may harm.",
                "Unused stockpiles while patients suffer is unethical.",
                "SpO2 guides titration.",
            ],
            "medium",
        ),
        (
            "Difficult airway algorithms prioritize:",
            "Oxygenation first, calling for help, and progressing through established failed-airway pathways (including surgical airway when needed)",
            [
                "Repeated failed attempts without oxygenation strategy",
                "Sending the only skilled operator away",
                "Avoiding BVM/extraglottic rescue devices on principle",
            ],
            "Cannot-intubate/cannot-oxygenate pathways emphasize oxygen, help, and rescue devices/cricothyrotomy.",
            [
                "Repetition without oxygen kills.",
                "Help improves success.",
                "Rescue devices are integral.",
            ],
            "easy",
        ),
    ],
}

def main() -> None:
    write_bank(SLUG, topics)


if __name__ == "__main__":
    main()
