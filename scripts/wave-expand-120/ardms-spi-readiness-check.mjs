/** ARDMS SPI — extras 016–030 × 4 topics (60→120). Text/physics only; ≠ ABD/OB. */
export const extras = {
  "physics-basics": [
  [
    "A diagnostic pulse has a frequency of 5 MHz. What is its period?",
    "0.20 microseconds (T = 1/f)",
    [
      "5.0 microseconds (treating T as f)",
      "2.0 microseconds (as if f were 0.5 MHz)",
      "0.50 microseconds (as if f were 2 MHz)"
    ],
    "Period and frequency are reciprocals: T = 1/f. For 5 MHz (5 \u00d7 10^6 Hz), T = 1/(5 \u00d7 10^6) = 0.2 \u00d7 10^\u22126 s = 0.2 \u03bcs.",
    [
      "Uses T = f instead of T = 1/f, giving 5 \u03bcs.",
      "Confuses 1/0.5 MHz with the 5 MHz period.",
      "Would be correct for 2 MHz, not for 5 MHz."
    ],
    "easy"
  ],
  [
    "In soft tissue (c \u2248 1540 m/s), how does wavelength change if operating frequency doubles from 3 MHz to 6 MHz?",
    "Wavelength halves because \u03bb equals c divided by f",
    [
      "Wavelength doubles because \u03bb equals c multiplied by f",
      "Wavelength stays the same because soft-tissue speed is fixed",
      "Wavelength quadruples following an amplitude-squared rule"
    ],
    "Wavelength equals propagation speed divided by frequency (\u03bb = c/f). Doubling f halves \u03bb when c is constant in soft tissue.",
    [
      "Multiplies instead of divides frequency into speed.",
      "Assumes wavelength depends only on medium speed.",
      "Confuses intensity A^2 scaling with wavelength."
    ],
    "medium"
  ],
  [
    "If acoustic amplitude is doubled while beam area stays constant, how do power and intensity change?",
    "Both power and intensity increase by a factor of four",
    [
      "Both power and intensity increase by a factor of two",
      "Power doubles while intensity remains essentially unchanged",
      "Intensity doubles while power increases about eightfold"
    ],
    "Power and intensity are each proportional to amplitude squared. Doubling amplitude multiplies both by 2^2 = 4 when area is unchanged.",
    [
      "Treats power/intensity as linear with amplitude.",
      "Mixes area change with amplitude; area was held constant.",
      "Uses A^3 for power instead of the A^2 relationship."
    ],
    "medium"
  ],
  [
    "A 4 MHz beam travels 5 cm through soft tissue then returns. Compared with a 2 cm one-way path at the same frequency, total attenuation is roughly:",
    "Greater because attenuation rises with path length and frequency",
    [
      "Smaller because longer paths reduce the attenuation rate",
      "Unchanged because frequency alone sets total attenuation",
      "Greater mainly because impedance mismatch grows with depth"
    ],
    "Soft-tissue attenuation increases with both path length and frequency (often ~0.5 dB/cm/MHz). Longer round-trip distance means more dB loss at the same f.",
    [
      "Reverses the path-length effect on attenuation.",
      "Ignores that attenuation coefficient is applied per cm.",
      "Confuses reflection at interfaces with absorption along the path."
    ],
    "medium"
  ],
  [
    "The half-value layer (HVL) for a given frequency in soft tissue is the depth at which:",
    "Intensity falls to one-half of its initial value (\u22123 dB)",
    [
      "Wavelength equals half of the original soft-tissue wavelength",
      "Pressure amplitude falls to one-quarter of the start value",
      "Operating frequency drops by half because of attenuation"
    ],
    "HVL is the thickness of tissue that reduces intensity to 50% of the incident value, which is a \u22123 dB intensity change.",
    [
      "Confuses half-value layer with wavelength halving.",
      "Pressure halves with \u22126 dB intensity; HVL is intensity/2.",
      "Attenuation reduces amplitude/intensity, not operating frequency."
    ],
    "easy"
  ],
  [
    "At a soft tissue\u2013bone interface, a large fraction of the incident beam is reflected mainly because:",
    "Acoustic impedances differ greatly, raising the intensity reflection coefficient",
    [
      "Propagation speeds match, so transmitted energy cannot enter bone",
      "Wavelength in bone is typically shorter than in soft tissue",
      "Bone absorbs transmitted energy before any reflection can occur"
    ],
    "Intensity reflection depends on impedance mismatch: R = [(Z2 \u2212 Z1)/(Z2 + Z1)]^2. Soft tissue and bone have very different Z, so reflection is strong.",
    [
      "Speed mismatch drives refraction more than reflection fraction.",
      "Wavelength difference alone does not set reflection coefficient.",
      "Absorption after transmission is separate from interface reflection."
    ],
    "medium"
  ],
  [
    "A smooth liver capsule much larger than the wavelength returns a bright echo mainly when the beam is nearly perpendicular. That geometry is best described as:",
    "Specular reflection with angle of incidence equal to angle of reflection",
    [
      "Diffuse scattering that is strongest at near-grazing incidence",
      "Rayleigh scattering from structures much smaller than wavelength",
      "Refraction that bends the transmitted beam toward the normal"
    ],
    "Specular reflection occurs at large, smooth interfaces; strongest return is near normal incidence with i = r. Diffuse scatter redirects energy in many directions.",
    [
      "Diffuse scatter is weaker and less angle-dependent than specular.",
      "Rayleigh applies to scatterers << \u03bb (e.g., RBCs), not organ capsules.",
      "Refraction is transmission with bending, not the bright specular echo."
    ],
    "medium"
  ],
  [
    "Two wavelets from adjacent points on a wavefront arrive in phase at a location in the field. The combined pressure amplitude there is best explained by:",
    "Constructive interference adding the wavelet contributions",
    [
      "Destructive interference canceling both wavelets completely",
      "Snell's law bending each wavelet through the same angle",
      "Impedance matching that removes all relative phase differences"
    ],
    "Huygens\u2019 principle treats each point as a source of wavelets. In-phase arrival produces constructive interference, increasing net amplitude.",
    [
      "Destructive interference occurs for out-of-phase arrivals.",
      "Snell's law describes refraction at interfaces, not in-phase summing.",
      "Matching layers affect transmission; they do not create phase addition."
    ],
    "hard"
  ],
  [
    "Comparing two media with similar density, the stiffer medium (higher bulk modulus) typically shows:",
    "Higher propagation speed because speed rises with stiffness",
    [
      "Lower propagation speed because density alone determines speed",
      "Identical speed because frequency fixes propagation speed",
      "Higher speed whenever acoustic impedance of the medium is lower"
    ],
    "Propagation speed rises with stiffness (bulk modulus) and falls with density: roughly c = \u221a(B/\u03c1). At similar \u03c1, greater stiffness yields faster sound.",
    [
      "Density alone does not determine c when stiffness differs.",
      "Frequency sets wavelength via \u03bb = c/f, not the medium's c.",
      "Lower Z does not cause higher c; Z = \u03c1c relates the quantities."
    ],
    "medium"
  ],
  [
    "A pulsed system transmits for 2 \u03bcs and listens for 198 \u03bcs in each pulse-listen cycle. Duty factor is approximately:",
    "About 1% because DF equals PD divided by PRP (2/200)",
    [
      "About 2% using a 100 \u03bcs pulse repetition period",
      "About 50% as if transmit and listen times were equal",
      "About 99% by counting listening time as the duty factor"
    ],
    "Duty factor = pulse duration / pulse repetition period. Here PRP = 2 + 198 = 200 \u03bcs, so DF = 2/200 = 0.01 = 1%.",
    [
      "Uses wrong PRP (100 \u03bcs instead of 200 \u03bcs).",
      "Would require PD equal to listening time, which is not given.",
      "Confuses listening fraction with transmitting duty factor."
    ],
    "easy"
  ],
  [
    "Spatial pulse length (SPL) differs from pulse duration (PD) in that:",
    "SPL is pulse length in tissue (n \u00d7 \u03bb); PD is the pulse's time length",
    [
      "SPL is the same as PD after converting units to microseconds",
      "SPL equals period multiplied by the pulse repetition frequency",
      "SPL is the waiting time from one pulse start to the next (PRP)"
    ],
    "Pulse duration is time (n \u00d7 T). Spatial pulse length is distance (n \u00d7 \u03bb). Related by SPL = c \u00d7 PD in the medium, but they are not identical units.",
    [
      "PD is time; SPL is length\u2014unit conversion alone does not equate them.",
      "Period \u00d7 PRF is dimensionless duty-related, not SPL.",
      "PRP is the interval between pulses, not the pulse's spatial length."
    ],
    "medium"
  ],
  [
    "A heavily damped transducer produces a short pulse with a wide frequency bandwidth. Relative to a lightly damped narrow-band design, its quality factor (Q) is:",
    "Lower because Q is approximately center frequency over bandwidth",
    [
      "Higher because short pulses raise resonance sharpness",
      "Unchanged because Q tracks matching-layer thickness alone",
      "Higher because a wider bandwidth means a sharper resonance"
    ],
    "Quality factor is center frequency divided by bandwidth. Short, damped pulses broaden bandwidth and therefore lower Q; imaging favors low Q for axial resolution.",
    [
      "Short pulses widen bandwidth and reduce Q, not raise it.",
      "Matching layer affects transmission efficiency, not Q definition.",
      "Wider bandwidth means less sharp resonance (lower Q)."
    ],
    "hard"
  ],
  [
    "Red blood cells are much smaller than the ultrasound wavelength. Echoes from blood are therefore dominated by:",
    "Rayleigh scattering that increases strongly with frequency",
    [
      "Specular reflection of similar strength at every beam angle",
      "Complete absorption leaving essentially no usable backscatter",
      "Refraction that steers the whole beam toward the heart chambers"
    ],
    "Structures \u226a \u03bb produce Rayleigh scattering (intensity often ~f^4). Specular reflection needs large smooth interfaces, not RBC-scale scatterers.",
    [
      "Specular needs interfaces large and smooth relative to \u03bb.",
      "Blood does produce weak backscatter used in Doppler imaging.",
      "Refraction at vessel walls is separate from RBC-scale scatter."
    ],
    "hard"
  ],
  [
    "Using the soft-tissue range equation, an echo round-trip time of 130 \u03bcs corresponds to a reflector depth of about:",
    "10 cm using the 13 \u03bcs per cm of depth rule",
    [
      "5 cm if round-trip time were counted as 26 \u03bcs per cm",
      "13 cm if the conversion were treated as 10 \u03bcs per cm",
      "65 cm if the conversion were treated as 2 \u03bcs per cm"
    ],
    "The 13 \u03bcs/cm rule of thumb: depth (cm) \u2248 round-trip time (\u03bcs) / 13. So 130 \u03bcs \u2192 10 cm. (One-way time is half that.)",
    [
      "Uses 26 \u03bcs/cm (one-way style) incorrectly on round-trip time.",
      "Inverts the 13 \u03bcs and 10 cm relationship.",
      "Treats 2 \u03bcs/cm as if it were the soft-tissue round-trip rule."
    ],
    "easy"
  ],
  [
    "If received intensity doubles relative to a reference, the intensity change in decibels is approximately:",
    "About +3 dB for an intensity factor of two",
    [
      "About +6 dB which fits amplitude \u00d72 or intensity \u00d74",
      "About +10 dB which fits an intensity factor near ten",
      "About \u22123 dB which describes intensity falling by one-half"
    ],
    "On the intensity dB scale, a factor of 2 corresponds to about +3 dB (10 log10(2) \u2248 3). A factor of 10 is +10 dB; amplitude \u00d72 is about +6 dB.",
    [
      "+6 dB is roughly amplitude \u00d72 or intensity \u00d74.",
      "+10 dB corresponds to an intensity factor of about 10.",
      "\u22123 dB is a halving of intensity, not a doubling."
    ],
    "easy"
  ]
],
  "transducers-beam": [
  [
    "A designer sets the matching layer thickness near one-quarter wavelength at the operating frequency. What is the main purpose of that choice?",
    "Reduce the impedance mismatch so more sound enters tissue",
    [
      "Lengthen the pulse to raise quality factor",
      "Block heat transfer into the piezoelectric crystal",
      "Steer the beam electronically without delay lines"
    ],
    "A \u03bb/4 matching layer provides an intermediate impedance step between high-Z PZT and low-Z tissue, improving transmission and reducing reflection at the probe face.",
    [
      "Damping shortens pulses; matching does not lengthen them for Q.",
      "Thermal isolation is not why the matching layer is \u03bb/4 thick.",
      "Steering uses element timing; matching layer is an acoustic coupler."
    ],
    "medium"
  ],
  [
    "Compared with a lightly damped crystal, adding heavy backing material behind the PZT typically produces which tradeoff?",
    "Shorter pulses and better axial resolution, with reduced sensitivity",
    [
      "Longer pulses and better axial resolution, with higher sensitivity",
      "Narrower bandwidth and deeper penetration at the same output",
      "Thicker matching layer and stronger side-lobe amplitude"
    ],
    "Backing damps ringing so spatial pulse length falls and axial resolution improves, but less acoustic energy is available, so echo sensitivity drops.",
    [
      "Heavy damping shortens, not lengthens, the pulse; sensitivity falls.",
      "Damping widens bandwidth; it does not trade for deeper penetration alone.",
      "Matching layer thickness and side lobes are not the primary backing tradeoff."
    ],
    "medium"
  ],
  [
    "A lab technician proposes autoclaving a PZT imaging probe to sterilize it. Why is that unsafe for the piezoelectric element?",
    "Heating above the Curie temperature can destroy piezoelectric properties",
    [
      "Steam pressure permanently increases crystal bandwidth",
      "Autoclave cycles shift matching-layer thickness to \u03bb/2",
      "Heat converts PZT into a continuous-wave Doppler crystal"
    ],
    "PZT loses its polarized piezoelectric behavior if heated past the Curie temperature; autoclave temperatures can exceed that limit and ruin the transducer.",
    [
      "Steam does not usefully retune bandwidth; heat can depolarize PZT.",
      "Matching-layer thickness is set at manufacture, not by autoclave steam.",
      "CW crystals differ by construction, not by accidental autoclave conversion."
    ],
    "easy"
  ],
  [
    "During a cardiac exam you switch from a linear sequenced array on the neck to a sector phased array on the chest. How do these arrays mainly differ in beam direction control?",
    "Linear arrays scan by sequencing groups; phased arrays steer with tiny delays",
    [
      "Linear arrays steer with delays; phased arrays fire one fixed element",
      "Both arrays rely on a rotating acoustic mirror for every scan line",
      "Phased arrays sequence fixed groups; linear arrays use annular rings"
    ],
    "Linear sequenced arrays create parallel lines by switching which element group fires; phased arrays apply progressive time delays so one aperture steers and focuses sector lines.",
    [
      "Delay steering is the phased-array hallmark; linear sequencing walks groups.",
      "Mechanical mirrors are historical; modern arrays use electronic timing.",
      "Annular rings are a different geometry, not how linear scanners work."
    ],
    "medium"
  ],
  [
    "An older annular-array probe is described in a physics review. What focusing behavior best matches classic annular arrays?",
    "Concentric rings allow electronic focus while beam steer used mechanical motion",
    [
      "They steer electronically in elevation without any mechanical motion",
      "They fire rectangular elements in sequence like a linear array",
      "They produce continuous-wave Doppler signals without imaging focus"
    ],
    "Annular arrays use concentric ring elements with delay timing for electronic focusing; historically, steering or sweeping often still required mechanical motion of the assembly.",
    [
      "Classic annular designs focused electronically but did not fully replace mechanical sweep.",
      "Rectangular sequencing describes linear arrays, not annular rings.",
      "Annular arrays were imaging transducers with focusing, not CW-only probes."
    ],
    "hard"
  ],
  [
    "A thin vessel appears and disappears as you rock the probe slightly out of plane. Which beam property most limits that elevational (slice-thickness) detail?",
    "The acoustic lens and aperture shape that set slice thickness at depth",
    [
      "Pulse duration, which sets elevational beam width by itself",
      "PRF selection, which directly narrows the out-of-plane focus",
      "Reject control, which electronically thins the elevation plane"
    ],
    "Elevational resolution depends on beam thickness perpendicular to the scan plane, largely set by the lens and aperture geometry rather than axial pulse length or PRF.",
    [
      "Pulse duration governs axial resolution, not elevational thickness.",
      "PRF controls timing/aliasing tradeoffs, not slice-thickness focusing.",
      "Reject is a display threshold; it does not reshape the elevation beam."
    ],
    "medium"
  ],
  [
    "At a depth still within the near field of an unfocused single-element beam, intensity patterns oscillate before the natural focus. Which zone naming is correct?",
    "Fresnel (near) zone proximal to the natural focus; Fraunhofer (far) beyond it",
    [
      "Fraunhofer zone is the shallowest region before any divergence starts",
      "Fresnel zone begins after the beam has already fully diverged",
      "Near and far zones swap names when frequency increases"
    ],
    "The Fresnel (near) zone extends from the face to the natural focus; beyond that, the Fraunhofer (far) zone shows progressive divergence of the beam.",
    [
      "Fraunhofer is the far zone after the natural focus, not the shallowest near field.",
      "Fresnel is the near field before divergence dominates past the focus.",
      "Zone names stay the same; frequency changes NZL length, not the labels."
    ],
    "medium"
  ],
  [
    "Holding soft-tissue speed fixed, how do larger aperture diameter and higher frequency affect the natural focus depth (near-zone length)?",
    "Larger aperture or higher frequency lengthens the near-zone length",
    [
      "Larger aperture or higher frequency shortens the near-zone length",
      "Aperture size changes NZL but frequency has no effect on NZL",
      "Frequency changes NZL but aperture diameter leaves NZL unchanged"
    ],
    "Near-zone length scales approximately with aperture diameter squared over wavelength, so bigger crystal diameter or higher frequency (shorter \u03bb) pushes the natural focus deeper.",
    [
      "Both larger D and higher f increase NZL; they do not shorten it.",
      "Frequency enters via wavelength; it does affect NZL.",
      "Aperture diameter is a primary NZL term; it is not irrelevant."
    ],
    "hard"
  ],
  [
    "A phased-array system focuses a transmit beam at 6 cm by applying different start times across elements. What is that mechanism called?",
    "Electronic focusing using programmed delay lines across the aperture",
    [
      "Mechanical focusing using a fixed external acoustic mirror",
      "Apodization that randomly blanks half the elements each pulse",
      "Grating-lobe suppression by raising the pulse repetition frequency"
    ],
    "Transmit focus is formed by delaying outer elements relative to central ones so wavefronts arrive in phase at the chosen depth\u2014electronic delay focusing.",
    [
      "Fixed mirrors are passive; programmed delays are electronic focusing.",
      "Apodization weights amplitude; it is not the primary focus-delay method.",
      "PRF does not create the geometric focus delay pattern across elements."
    ],
    "easy"
  ],
  [
    "While echoes return from many depths, the scanner continuously updates receive delays so the listening focus tracks depth. What concept is this?",
    "Dynamic receive focusing that retunes delays as echoes arrive",
    [
      "Single fixed receive focus locked for the entire listening interval",
      "Transmit multifocus that keeps one receive delay for every depth",
      "Duty-factor limiting that freezes delays after the first returning echo"
    ],
    "Dynamic receive focusing changes element delays during reception so the receive focus follows depth, improving lateral detail without requiring multiple transmits for every depth.",
    [
      "A single fixed receive delay cannot stay optimal at every depth.",
      "Transmit multifocus is separate; dynamic receive updates listening delays.",
      "Duty factor is on/off timing of pulses, not receive delay tracking."
    ],
    "medium"
  ],
  [
    "Off-axis artifactual echoes appear as grating lobes when element spacing is relatively large. How does that differ from ordinary side lobes, and what helps?",
    "Grating lobes arise from discrete array spacing; closer pitch and apodization help",
    [
      "Side lobes arise from array pitch; grating lobes are single-element diffraction",
      "Grating lobes shrink when you increase element spacing past one wavelength",
      "Side lobes and grating lobes are identical and cannot be mitigated"
    ],
    "Side lobes are weak off-axis energy from finite apertures; grating lobes are stronger replicas tied to periodic element spacing. Subdicing, tighter pitch, and apodization reduce grating lobes.",
    [
      "Side lobes occur with single elements too; grating lobes need array spacing.",
      "Larger pitch worsens grating lobes; closer spacing reduces them.",
      "They differ in cause; mitigation with pitch control and apodization exists."
    ],
    "hard"
  ],
  [
    "To reduce unwanted off-axis energy, the beam former drives outer elements with lower amplitude than central elements. What is this technique called, and why?",
    "Apodization\u2014amplitude shading that weakens side and grating lobe energy",
    [
      "Dynamic receive focusing\u2014delay changes that raise outer-element drive",
      "Matching-layer tuning\u2014impedance steps that blank central elements",
      "Spatial compounding\u2014frame averaging that boosts grating-lobe peaks"
    ],
    "Apodization applies amplitude weights (stronger center, weaker edges) across the aperture so side-lobe and grating-lobe levels fall, at some cost to main-lobe width.",
    [
      "Dynamic receive focusing adjusts delays, not primarily amplitude shading.",
      "Matching layers couple acoustically; they do not blank central elements.",
      "Compounding averages steer angles; it is not amplitude apodization."
    ],
    "medium"
  ],
  [
    "A broadband multifrequency probe lets the operator select a lower or higher center frequency on the same footprint. What tradeoff should you expect?",
    "Higher frequency improves resolution but reduces useful penetration depth",
    [
      "Higher frequency deepens penetration while axial detail worsens",
      "Lower frequency sharpens elevational focus without changing attenuation",
      "Bandwidth choice removes Curie temperature limits on sterilization"
    ],
    "Broadband transducers support selectable operating bands; raising frequency shortens wavelength and can improve resolution, but attenuation rises so penetration falls.",
    [
      "Higher frequency cuts penetration and tends to improve, not worsen, detail.",
      "Lower frequency favors penetration; it does not magically sharpen elevation alone.",
      "Bandwidth selection does not change Curie temperature or autoclave safety."
    ],
    "easy"
  ],
  [
    "A continuous-wave Doppler probe is built differently from a pulsed imaging crystal. Which construction feature is typical of CW transducers?",
    "Little or no backing material, yielding high Q and long continuous ringing",
    [
      "Heavy backing for short pulses and very wide imaging bandwidth",
      "Quarter-wave matching with a shared single crystal for transmit and receive",
      "Annular rings that electronically steer color boxes in two planes"
    ],
    "CW Doppler favors narrowband, efficiently ringing crystals: backing is minimized or omitted (high Q), and separate transmit/receive elements often run continuously.",
    [
      "Heavy backing is for short pulsed imaging pulses, not classic CW probes.",
      "CW probes commonly use separate Tx/Rx crystals; shared single-crystal CW is atypical.",
      "Annular electronic 2-D steering is not the defining CW construction feature."
    ],
    "medium"
  ],
  [
    "During sector scanning, the system must both steer each line and place the focus. Which subsystem applies the element timing that accomplishes that?",
    "The beam former, which sets delays for steering and focusing",
    [
      "The scan converter, which creates acoustic time delays in tissue",
      "The matching layer controller, which phases each element electrically",
      "The reject circuit, which sequences delays after demodulation"
    ],
    "The beam former generates transmit and receive delay patterns across elements so wavefronts steer to the desired angle and converge at the chosen focus.",
    [
      "Scan conversion maps echo data to display pixels; it does not form acoustic delays.",
      "Matching layers are passive acoustic couplers, not electronic delay controllers.",
      "Reject thresholds amplitudes after detection; it does not create steer/focus delays."
    ],
    "easy"
  ]
],
  "doppler-hemodynamics": [
  [
    "On a spectral display, inverted arterial flow below the baseline after a vessel twist is most cleanly confirmed by:",
    "Check a reference vessel plus beam steer/invert before calling disease",
    [
      "Raise the wall filter until the entire waveform disappears from view",
      "Use B-mode tissue harmonics to reverse spectral flow polarity on screen",
      "Increase color packet size alone to flip the spectral baseline direction"
    ],
    "Apparent flow reversal can be true physiology or a steering/invert/map setup issue. Confirm against a reference vessel and control settings before diagnosing pathology.",
    [
      "Erasing the waveform with wall filter does not confirm direction.",
      "B-mode harmonics do not reverse spectral flow polarity.",
      "Packet size affects estimate quality/frame rate, not baseline polarity by itself."
    ],
    "medium"
  ],
  [
    "A pulsed-Doppler spectrum wraps around the baseline in a high-velocity jet. Which control change most directly raises the Nyquist limit?",
    "Increase PRF (velocity scale) within depth limits",
    [
      "Widen the color box while leaving PRF unchanged",
      "Raise the wall filter without touching PRF",
      "Switch to harmonic B-mode frequencies alone"
    ],
    "Nyquist limit equals PRF/2. Raising PRF increases the highest unambiguous velocity before wraparound.",
    [
      "A wider color box often forces a lower PRF budget rather than raising Nyquist.",
      "Wall filter removes low shifts; it does not raise the Nyquist ceiling.",
      "B-mode harmonics do not set the pulsed-Doppler Nyquist limit."
    ],
    "medium"
  ],
  [
    "After a control change, peak systole remains on the spectrum but slow diastolic venous flow vanishes from the baseline. What is the most likely explanation?",
    "Wall filter set high enough to reject low-velocity diastolic shifts",
    [
      "Sample gate moved into air outside the body wall in this SPI context",
      "Color write priority disabled on a duplex preset in this SPI context",
      "Thermal index display turned off on the monitor in this SPI context"
    ],
    "High-pass wall filters erase near-baseline shifts. Over-filtering removes diastolic or venous flow while loud systolic peaks survive.",
    [
      "An extracorporeal gate would lose the whole tracing, not diastole alone.",
      "Write priority affects color versus B-mode layering, not isolated diastolic wipeout.",
      "Hiding TI does not remove selected Doppler frequency bands."
    ],
    "medium"
  ],
  [
    "You lengthen the PW sample gate so it spans from near wall to far wall of a vessel. The spectrum typically becomes:",
    "Broader, because more velocity lamina enter one gate",
    [
      "Narrower, because longer gates cancel spectral width",
      "Immune to aliasing without any PRF change",
      "Forced to a Doppler angle of zero degrees"
    ],
    "A longer gate mixes slow wall-adjacent and faster central velocities, widening the spectrum (spectral broadening).",
    [
      "Longer gates usually increase\u2014not decrease\u2014velocity spread in the trace.",
      "Gate length does not raise PRF or the Nyquist limit by itself.",
      "Beam\u2013flow geometry sets angle; gate length does not reset it to zero."
    ],
    "medium"
  ],
  [
    "Volume flow is roughly conserved through a focal luminal narrowing. Mean velocity in the narrowest segment should:",
    "Rise because the same flow crosses a smaller area",
    [
      "Fall because every narrowing slows red cells uniformly",
      "Stay fixed because pressure drop cancels area change",
      "Become undefined until a stent restores area"
    ],
    "Continuity: Q \u2248 A\u00b7v. When area shrinks at fixed volume flow, mean velocity in the jet rises.",
    [
      "Stenotic jets accelerate; they do not uniformly decelerate flow.",
      "Bernoulli links pressure and velocity, yet smaller area still drives higher jet speed.",
      "Flow continues through a stenosis; velocity remains defined."
    ],
    "easy"
  ],
  [
    "Which change pushes a vessel toward turbulent rather than laminar flow (higher Reynolds number)?",
    "Higher mean velocity, larger diameter, and lower blood viscosity",
    [
      "Lower velocity in a tiny capillary with higher viscosity",
      "Any parabolic profile, regardless of speed or size",
      "Setting the Doppler angle to ninety degrees in software"
    ],
    "Reynolds number rises with velocity and diameter and falls with viscosity. High Re favors disturbed or turbulent flow.",
    [
      "That combination lowers Re and favors stable laminar flow.",
      "Parabolic laminar profiles exist at low Re; they are not turbulent by definition.",
      "Doppler angle changes measured shift, not the fluid-dynamic Re of the blood."
    ],
    "hard"
  ],
  [
    "Resistive index on a carotid-style tracing is calculated as:",
    "(Peak systolic velocity \u2212 end-diastolic velocity) \u00f7 peak systolic velocity",
    [
      "(Peak systolic \u2212 end-diastolic) \u00f7 mean velocity across the cycle",
      "Peak systolic velocity \u00f7 Doppler angle in degrees in this SPI context",
      "End-diastolic velocity alone without using systole in this SPI context"
    ],
    "RI = (PSV \u2212 EDV) / PSV. It summarizes pulsatility using the systolic and diastolic peaks.",
    [
      "Using mean velocity is a different pulsatility-style ratio, not standard RI.",
      "Angle in degrees is not part of the RI formula.",
      "RI needs both the systolic and diastolic peaks."
    ],
    "easy"
  ],
  [
    "You increase color packet (ensemble) length while holding line density fixed. The usual tradeoff is:",
    "More robust velocity estimates with a lower color frame rate",
    [
      "Higher frame rate with no time cost per line in this SPI context",
      "Wall filters becoming unnecessary for clutter",
      "Automatic conversion of power mode into CW spectral"
    ],
    "Larger packets spend more pulses per color line, improving estimates but costing time, so frame rate falls.",
    [
      "Extra pulses per line cost time; frame rate usually drops.",
      "Clutter rejection still needs an appropriate wall filter.",
      "Packet size does not change the Doppler mode family by itself."
    ],
    "medium"
  ],
  [
    "A variance or turbulence color tag lights up inside a jet. That display most often means:",
    "A wide spread of velocities (disturbed flow) inside the sample",
    [
      "Perfectly uniform plug flow with one velocity in this SPI context",
      "That soft-tissue TI has crossed a fixed legal limit",
      "That the matching layer thickness is incorrect in this SPI context"
    ],
    "Variance encodes velocity spread within the packet \u2014 a clue to disturbed or turbulent flow, not a bioeffects citation or transducer build error.",
    [
      "Uniform plug flow shows low variance.",
      "TI is a heating index and is separate from variance maps.",
      "Matching-layer design is unrelated to color variance meaning."
    ],
    "medium"
  ],
  [
    "When comparing power Doppler with velocity color Doppler for slow trickle flow, power mode is generally:",
    "More sensitive to flow presence and less angle-dependent in display",
    [
      "Equally precise for peak cm/s quantification as PW spectral",
      "Free of flash or clutter without any filtering in this SPI context",
      "The required mode whenever a pressure gradient is needed"
    ],
    "Power Doppler encodes signal strength, aiding detection of slow flow with less angle/aliasing quirks, but it does not replace quantitative spectral velocity.",
    [
      "Peak velocity quantification still needs spectral (or calibrated velocity) methods.",
      "Motion clutter and flash can still appear; filters remain relevant.",
      "Simplified Bernoulli gradients need reliable peak velocities, not power amplitude alone."
    ],
    "medium"
  ],
  [
    "Triplex imaging on a vascular preset typically shows which combination together?",
    "Grayscale B-mode, color flow, and a spectral Doppler tracing",
    [
      "B-mode and M-mode without any Doppler channel",
      "Three patient medical-record numbers on one screen",
      "Continuous-wave Doppler without a B-mode image"
    ],
    "Triplex means simultaneous B-mode + color + spectral. It is informative but expensive in frame-rate and PRF budget.",
    [
      "Triplex specifically adds Doppler modes alongside B-mode.",
      "It names an imaging combination, not multiple chart IDs.",
      "CW without imaging is not called triplex."
    ],
    "easy"
  ],
  [
    "With a deep PW gate and a very high PRF, echoes from an earlier pulse may be mapped to the wrong depth. That error is called:",
    "Range ambiguity",
    [
      "Curie-temperature depolarization of the crystal",
      "Soft-tissue speed rewriting itself to 1600 m/s",
      "Complete immunity to aliasing at every velocity"
    ],
    "If a new pulse is sent before prior echoes return, late echoes can be assigned to the wrong range \u2014 classic range ambiguity.",
    [
      "Curie damage is heat destruction of piezoelectricity, not a timing map error.",
      "Assumed soft-tissue speed for ranging stays a machine constant near 1540 m/s.",
      "High PRF can still alias; range ambiguity is a separate depth-assignment error."
    ],
    "hard"
  ],
  [
    "Using the simplified Bernoulli relation \u0394P \u2248 4v\u00b2 (mmHg with v in m/s), a peak jet of 3 m/s predicts a pressure drop of about:",
    "36 mmHg (because 4 \u00d7 3\u00b2 = 36)",
    [
      "12 mmHg (as if computing 4 \u00d7 3 without squaring)",
      "9 mmHg (as if computing 3\u00b2 without multiplying by 4)",
      "3 mmHg (as if reporting the velocity number itself)"
    ],
    "4 \u00d7 3\u00b2 = 4 \u00d7 9 = 36 mmHg. The simplified form ignores proximal velocity and viscous losses.",
    [
      "Omitting the square underestimates the gradient (4 \u00d7 3 = 12).",
      "Using only 3\u00b2 = 9 forgets the leading factor of 4.",
      "The velocity in m/s is an input, not the mmHg result."
    ],
    "medium"
  ],
  [
    "If cross-sectional area halves and volume flow is unchanged, mean velocity through that section should:",
    "Approximately double",
    [
      "Fall to about half of the original value",
      "Remain exactly the same as before",
      "Drop to an undefined value until area recovers"
    ],
    "From Q = A\u00b7v, if area halves at fixed flow, mean velocity roughly doubles under continuity.",
    [
      "Halving area raises velocity for fixed flow; it does not cut velocity in half.",
      "Velocity must change when area changes at fixed volume flow.",
      "Flow continues; velocity stays defined as Q/A."
    ],
    "easy"
  ],
  [
    "A weaker duplicate spectral waveform appears mirrored across the baseline when gain is high and the beam is near perpendicular. A common label for this is:",
    "Spectral mirror / crosstalk",
    [
      "Comet-tail reverberation from a surgical clip",
      "Dead-zone ring-down in the first millimeters",
      "Elevational slice-thickness fill-in of a cyst"
    ],
    "Over-gained Doppler near 90\u00b0 can leak energy into the opposite channel, painting a mirrored spectrum (crosstalk).",
    [
      "Comet-tail is a B-mode reverberation trail, not a spectral baseline mirror.",
      "Dead zone is a near-field B-mode QA limit.",
      "Slice-thickness fill-in is an elevational B-mode partial-volume effect."
    ],
    "hard"
  ]
],
  "artifacts-safety": [
  [
    "Bright, closely spaced echoes taper deep to a surgical clip without a long fluid path. The best match is:",
    "Comet-tail reverberation from a strong discrete reflector",
    [
      "Simple through-transmission enhancement behind clear fluid",
      "Refraction edge shadowing along a curved interface",
      "Random electrical interference lines across the sector"
    ],
    "Comet-tail is a compact reverberation trail from small strong reflectors such as clips. Enhancement brightens deep tissue; edge shadows are dark bands.",
    [
      "Enhancement brightens tissue deep to fluid; it is not a tapering trail from a clip.",
      "Edge shadowing is a dark refractive band, not a bright tapering trail.",
      "Electrical noise is usually irregular bright lines, not a localized taper."
    ],
    "medium"
  ],
  [
    "A reflector lying in fat is painted deeper than its true anatomic depth. The best explanation is:",
    "Assumed 1540 m/s is higher than fat\u2019s true speed, so travel time maps too deep",
    [
      "Fat\u2019s speed above 1540 m/s pulls every reflector too shallow",
      "TGC miscalibration is the sole way displayed depth can err in this SPI context",
      "Color PRF directly rewrites B-mode ranging equations in this SPI context"
    ],
    "Range uses c\u00b7t/2 with assumed c\u22481540 m/s. Slower fat lengthens round-trip time, so the reflector is placed too deep.",
    [
      "Fat is slower than average soft tissue, so the bias is deeper rather than shallower.",
      "TGC changes brightness versus depth; it does not rewrite speed-of-sound ranging.",
      "PRF is a Doppler timing control, not the B-mode speed assumption."
    ],
    "hard"
  ],
  [
    "An oblique interface bends the beam; a reflector looks laterally shifted and a dark edge band appears. Call this primarily:",
    "Refraction artifact",
    [
      "Mirror-image duplication deep to a diaphragm-like reflector",
      "Elevational slice-thickness fill-in of a tiny cyst",
      "Color-bar wraparound from an undersampled jet"
    ],
    "Refraction at speed mismatches changes ray path, causing lateral misregistration and edge shadows.",
    [
      "Mirror image duplicates structures deep to a strong specular reflector.",
      "Partial-volume fill-in is elevational averaging inside a voxel.",
      "Aliasing wraparound is a Doppler display issue, not refraction."
    ],
    "medium"
  ],
  [
    "Echoes travel a longer indirect route before returning, so the machine places the reflector too deep. That pattern is:",
    "Multipath artifact",
    [
      "An automatic improvement in axial resolution",
      "New anatomy created by tissue-harmonic imaging",
      "Piezoelectric failure from exceeding Curie temperature"
    ],
    "Multipath lengthens travel time; with straight-line ranging assumed, displayed depth is overestimated.",
    [
      "This is misregistration, not a resolution upgrade.",
      "Harmonics change contrast and clutter; they do not define multipath depth error.",
      "Curie damage destroys piezoelectricity; it is not this path-length display error."
    ],
    "medium"
  ],
  [
    "A vessel appears twice \u2014 once at the true depth and again deeper beyond a strong specular reflector. The deeper copy is most likely:",
    "Mirror-image artifact",
    [
      "Proof a second real vessel must exist at that depth",
      "Side-lobe debris filling a simple cyst lumen",
      "Near-field dead-zone ring-down at the skin line"
    ],
    "Strong specular reflectors (for example diaphragm) can bounce echoes so a virtual image is painted deep to the true structure.",
    [
      "Mirror copies are common at strong reflectors and may not be real anatomy.",
      "Side-lobe fill-in adds internal echoes to cysts; it is not a deep duplicate vessel.",
      "Dead zone is a near-field limit, not a deep mirror copy."
    ],
    "easy"
  ],
  [
    "Low-level echoes appear inside an otherwise simple cyst because energy arrived from off-axis lobes. This is:",
    "Side-lobe or grating-lobe fill-in",
    [
      "Acoustic shadowing distal to a calculus",
      "Proof the main beam has zero off-axis energy",
      "A thermal-index color overlay on the cyst"
    ],
    "Side or grating lobes can map off-axis echoes into the main-beam line of sight, filling cysts with debris-like echoes.",
    [
      "Shadowing darkens tissue distal to attenuators; it does not fill cysts with echoes.",
      "Real beams have side lobes; assuming zero off-axis energy is incorrect.",
      "TI is a safety index, not a cyst fill-in mechanism."
    ],
    "medium"
  ],
  [
    "A thin cyst fills with echoes because the elevational beam is thicker than the cyst diameter. Label this:",
    "Partial-volume / slice-thickness artifact",
    [
      "Comet-tail trail from a metallic surgical clip",
      "Spectral mirror crosstalk across the baseline",
      "Pulsed-Doppler range ambiguity at high PRF"
    ],
    "Elevational thickness averages cyst and adjacent tissue in one voxel, producing internal echoes that mimic debris.",
    [
      "Comet-tail is a reverberation trail from a strong point reflector.",
      "Spectral mirror is a Doppler display duplicate across baseline.",
      "Range ambiguity is a pulsed-Doppler depth-assignment timing error."
    ],
    "medium"
  ],
  [
    "Bright vertical spikes march across the sector with no anatomic pattern. A first troubleshooting step is to check for:",
    "Nearby electrical interference, cable issues, or external EMI sources",
    [
      "Sudden doubling of axial resolution in soft tissue in this SPI context",
      "Matching-layer detachment inside every linear probe in this SPI context",
      "A requirement to keep output power at maximum in this SPI context"
    ],
    "Electrical interference often paints periodic bright lines. Inspect cables, grounding, and nearby equipment before blaming tissue.",
    [
      "Noise spikes are not a resolution upgrade.",
      "A matching-layer problem would degrade imaging differently than marching EMI lines.",
      "ALARA favors the lowest output that still answers the clinical question."
    ],
    "easy"
  ],
  [
    "On a grayscale image of nearly isoechoic tissues, contrast resolution refers primarily to the system\u2019s ability to:",
    "Distinguish tissues with similar echo amplitudes (subtle gray-level differences)",
    [
      "Separate two closely spaced reflectors along the beam axis",
      "Read peak systolic velocity directly in centimeters per second",
      "Raise PRF without changing the imaging depth setting on the console"
    ],
    "Contrast resolution means amplitude discrimination between similar grays. Axial or lateral resolution means spatial separation of close reflectors.",
    [
      "Separating close axial reflectors is spatial (axial) resolution.",
      "Velocity readout is a Doppler measurement task.",
      "PRF versus depth is a timing tradeoff, not contrast resolution."
    ],
    "easy"
  ],
  [
    "Pin targets at known spacing in a tissue-mimicking phantom are used mainly to check:",
    "Spatial measurement accuracy and detail-resolution performance",
    [
      "In-vivo patient thermal index without a sensor in this SPI context",
      "Whether a candidate has already passed the SPI exam",
      "Which CPT codes to bill for the clinical study in this SPI context"
    ],
    "Phantom pins at known distances test caliper accuracy, dead zone, and detail resolution under controlled conditions.",
    [
      "Phantoms do not replace on-patient TI monitoring during scanning.",
      "Phantom QA does not certify a person for SPI.",
      "Billing codes are unrelated to pin-target image QA."
    ],
    "easy"
  ],
  [
    "On a phantom, the first few millimeters under the probe face stay uncleared by ring-down. That region is the:",
    "Near-field dead zone where transmit ring-down obscures shallow targets",
    [
      "Far-field Fraunhofer zone where focusing disappears in this SPI context",
      "Doppler wall-filter stopband on a spectral trace in this SPI context",
      "Proof soft-tissue speed equals exactly 1600 m/s in this SPI context"
    ],
    "Dead zone is the shallow depth where transmitter ring-down prevents useful echoes. QA tracks it; standoffs can help clinically.",
    [
      "Dead zone is a near-field limit, not a far-zone diffraction claim.",
      "Wall filters are Doppler controls on frequency shift, not B-mode dead zone.",
      "Assumed average soft-tissue speed for ranging remains near 1540 m/s."
    ],
    "medium"
  ],
  [
    "Mechanical index on the display is most closely tied to risk of:",
    "Cavitation-related bioeffects",
    [
      "Steady heating tracked by thermal index alone",
      "Autoclave damage to a piezoelectric element",
      "Refraction edge shadows beside a vessel"
    ],
    "MI indexes cavitation likelihood; TI indexes heating. ALARA uses both together with exposure time and output.",
    [
      "Heating risk is the thermal index domain, not MI\u2019s primary meaning.",
      "Curie/autoclave damage is a probe-care failure, not the MI bioeffect index.",
      "Refraction shadows are imaging artifacts, not an MI readout meaning."
    ],
    "easy"
  ],
  [
    "Thermal index for bone (TIB) matters most when the beam dwells near:",
    "Ossified bone where absorption and heating risk concentrate",
    [
      "Air-filled lung without any bony interfaces nearby",
      "Color variance maps as a stand-alone safety score",
      "Matching-layer thickness checks during manufacturing"
    ],
    "Bone absorbs strongly; TIB estimates heating risk near bone. Soft-tissue TI (TIS) covers a different heating pathway.",
    [
      "TIB specifically flags bone heating pathways rather than air-only fields.",
      "Variance is a Doppler display cue, not a thermal safety index.",
      "Matching layers are transducer construction details, not TIB."
    ],
    "medium"
  ],
  [
    "Which approach best follows ALARA while keeping the exam diagnostic?",
    "Lower acoustic output and use receiver gain when the image allows",
    [
      "Keep output at 100% and reduce gain as the first step",
      "Hide MI and TI readouts so they cannot influence scanning",
      "Hold high output indefinitely while the image is frozen"
    ],
    "Receiver gain amplifies returning echoes without raising transmitted intensity. ALARA minimizes power and dwell time while still answering the question.",
    [
      "High output with low gain still delivers more acoustic energy than needed.",
      "Hiding indices does not reduce acoustic exposure.",
      "Long high-output holds are opposite of minimizing exposure time."
    ],
    "medium"
  ],
  [
    "Regulatory acoustic-output characterization in a water tank commonly uses:",
    "A calibrated hydrophone (with related radiation-force methods)",
    [
      "The on-screen MI number with no external sensor",
      "A stethoscope pressed against the probe face in this SPI context",
      "Patient body-mass index as the sole metric in this SPI context"
    ],
    "Calibrated hydrophones and radiation-force balances quantify pressure and intensity for standards. On-screen MI/TI are operator indices derived from such work.",
    [
      "MI is an index for operators; lab characterization still needs sensors.",
      "A stethoscope is not an acoustic-output metrology instrument.",
      "BMI does not calibrate probe acoustic output."
    ],
    "hard"
  ]
],
};
