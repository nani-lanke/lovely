# Generates elegant SVG placeholder images for the portfolio.
# Replace any generated file with your real artwork (keep the same filename/path).
$base = Join-Path $PSScriptRoot "images"

function Save-Svg($path, $content) {
  $full = Join-Path $base $path
  New-Item -ItemType Directory -Force -Path (Split-Path $full) | Out-Null
  [System.IO.File]::WriteAllText($full, $content, (New-Object System.Text.UTF8Encoding($false)))
}

# ---------- Logo (square monogram) ----------
function Logo($mono, $c1, $c2) {
@"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="$mono logo">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="$c1"/><stop offset="1" stop-color="$c2"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="44" fill="#0e0e12"/>
  <rect x="6" y="6" width="188" height="188" rx="40" fill="url(#g)" opacity="0.18"/>
  <rect x="6" y="6" width="188" height="188" rx="40" fill="none" stroke="url(#g)" stroke-width="2"/>
  <text x="100" y="132" font-family="Georgia, serif" font-size="96" font-weight="700"
        text-anchor="middle" fill="url(#g)">$mono</text>
</svg>
"@
}

# ---------- Phone screenshot (9:16) ----------
function Shot($title, $c1, $c2, $kind) {
  $blocks = ""
  if ($kind -eq "grid") {
    for ($r=0; $r -lt 3; $r++) { for ($c=0; $c -lt 2; $c++) {
      $x = 70 + $c*180; $y = 280 + $r*200
      $blocks += "<rect x='$x' y='$y' width='150' height='160' rx='18' fill='url(#g)' opacity='0.16'/><rect x='$x' y='$y' width='150' height='160' rx='18' fill='none' stroke='url(#g)' stroke-width='1.5' opacity='0.5'/>"
    }}
  } elseif ($kind -eq "list") {
    for ($i=0; $i -lt 5; $i++) {
      $y = 280 + $i*150
      $blocks += "<rect x='70' y='$y' width='340' height='118' rx='16' fill='#16161c'/><circle cx='128' cy='$($y+59)' r='30' fill='url(#g)' opacity='0.55'/><rect x='178' y='$($y+34)' width='180' height='14' rx='7' fill='#2a2a32'/><rect x='178' y='$($y+62)' width='120' height='12' rx='6' fill='#222229'/>"
    }
  } else {
    $blocks = "<circle cx='240' cy='430' r='120' fill='url(#g)' opacity='0.2'/><circle cx='240' cy='430' r='120' fill='none' stroke='url(#g)' stroke-width='2'/><rect x='110' y='640' width='260' height='18' rx='9' fill='#2a2a32'/><rect x='150' y='678' width='180' height='14' rx='7' fill='#222229'/>"
  }
@"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 854" role="img" aria-label="$title screenshot">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="$c1"/><stop offset="1" stop-color="$c2"/></linearGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101015"/><stop offset="1" stop-color="#0b0b0f"/></linearGradient>
  </defs>
  <rect width="480" height="854" fill="url(#bg)"/>
  <rect x="0" y="0" width="480" height="150" fill="url(#g)" opacity="0.12"/>
  <rect x="190" y="34" width="100" height="8" rx="4" fill="#3a3a44"/>
  <text x="40" y="118" font-family="Georgia, serif" font-size="40" font-weight="700" fill="url(#g)">$title</text>
  $blocks
  <rect x="0" y="780" width="480" height="74" fill="#0d0d12"/>
  <circle cx="120" cy="817" r="9" fill="url(#g)"/><circle cx="240" cy="817" r="9" fill="#2a2a32"/><circle cx="360" cy="817" r="9" fill="#2a2a32"/>
</svg>
"@
}

# ---------- Feature banner (16:9) ----------
function Feature($title, $sub, $c1, $c2) {
@"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" role="img" aria-label="$title feature graphic">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="$c1"/><stop offset="1" stop-color="$c2"/></linearGradient>
    <radialGradient id="r" cx="0.5" cy="0.3" r="0.8"><stop offset="0" stop-color="$c1" stop-opacity="0.35"/><stop offset="1" stop-color="#0b0b0f" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1280" height="720" fill="#0c0c10"/>
  <rect width="1280" height="720" fill="url(#r)"/>
  <circle cx="1050" cy="200" r="240" fill="url(#g)" opacity="0.14"/>
  <circle cx="1050" cy="200" r="160" fill="none" stroke="url(#g)" stroke-width="2" opacity="0.5"/>
  <text x="90" y="350" font-family="Georgia, serif" font-size="96" font-weight="800" fill="url(#g)">$title</text>
  <text x="96" y="410" font-family="Segoe UI, sans-serif" font-size="32" fill="#9a978f">$sub</text>
  <rect x="96" y="460" width="180" height="8" rx="4" fill="url(#g)"/>
</svg>
"@
}

# ===== Developer brand =====
Save-Svg "dev/logo-dev.svg" (Logo "AW" "#e8c766" "#b8902a")
Save-Svg "dev/favicon.svg" (Logo "AW" "#e8c766" "#b8902a")
Save-Svg "dev/og-banner.svg" (Feature "Lovely AW Co" "App and Web Developer" "#e8c766" "#b8902a")

# ===== Cute Tutor (playful pink/gold) =====
Save-Svg "cute-tutor/logo.svg" (Logo "CT" "#f6a8c8" "#d4af37")
Save-Svg "cute-tutor/feature.svg" (Feature "Cute Tutor" "Fun, interactive learning for kids" "#f6a8c8" "#e8c766")
Save-Svg "cute-tutor/shot1.svg" (Shot "Cute Tutor" "#f6a8c8" "#d4af37" "grid")
Save-Svg "cute-tutor/shot2.svg" (Shot "Categories" "#f6a8c8" "#d4af37" "grid")
Save-Svg "cute-tutor/shot3.svg" (Shot "Quiz" "#f6a8c8" "#d4af37" "hero")
Save-Svg "cute-tutor/shot4.svg" (Shot "Matching" "#f6a8c8" "#d4af37" "grid")

# ===== ScheduleMsg (teal/gold) =====
Save-Svg "schedulemsg/logo.svg" (Logo "SM" "#8fd6c0" "#d4af37")
Save-Svg "schedulemsg/feature.svg" (Feature "ScheduleMsg" "Send the right message at the right time" "#8fd6c0" "#e8c766")
Save-Svg "schedulemsg/shot1.svg" (Shot "Scheduled" "#8fd6c0" "#d4af37" "list")
Save-Svg "schedulemsg/shot2.svg" (Shot "Compose" "#8fd6c0" "#d4af37" "hero")
Save-Svg "schedulemsg/shot3.svg" (Shot "Platforms" "#8fd6c0" "#d4af37" "grid")
Save-Svg "schedulemsg/shot4.svg" (Shot "Reminder" "#8fd6c0" "#d4af37" "hero")

# ===== LogoHub (blue/gold) =====
Save-Svg "logohub/logo.svg" (Logo "LH" "#8fb8f0" "#d4af37")
Save-Svg "logohub/feature.svg" (Feature "LogoHub" "Explore businesses through logos" "#8fb8f0" "#e8c766")
Save-Svg "logohub/shot1.svg" (Shot "Logo Grid" "#8fb8f0" "#d4af37" "grid")
Save-Svg "logohub/shot2.svg" (Shot "Details" "#8fb8f0" "#d4af37" "hero")
Save-Svg "logohub/shot3.svg" (Shot "Categories" "#8fb8f0" "#d4af37" "grid")

Write-Host "Done. Generated SVG placeholders under $base"
