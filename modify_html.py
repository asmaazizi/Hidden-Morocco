import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to capture everything from <div class="tour-details"> or <div class="activities-luxury">
# up to their closing div, strictly bound within the modal constraint by checking it manually.
# Since we know the structure:
sections_to_replace = [
    r'<!-- TOUR DETAILS SECTION -->\s*<div class="tour-details">.*?</div>\s*</div>\s*</div>\s*</div>\s*<!-- Merzouga -->',
    r'<div class="activities-luxury">.*?</ul>\s*</div>\s*</div>\s*</div>\s*<!-- Chefchaouen -->',
    r'<!-- ===== TOUR DETAILS: Morocco.*?\s*<div class="tour-details">.*?</div>\s*</div>\s*</div>\s*</div>\s*<!-- Essaouira -->',
    r'<div class="activities-luxury">.*?</div>\s*</div>\s*</div>\s*<!-- Fes -->',
    r'<!-- ===== TOUR DETAILS: Fes to.*?<div class="tour-details">.*?</div>\s*</div>\s*</div>\s*</div>\s*<!-- Casablanca -->',
    r'<!-- ===== TOUR DETAILS: Casablanca.*?<div class="tour-details">.*?</div>\s*</div>\s*</div>\s*</section>'
]

cta_template = """
          <div class="modal-reservation">
            <h3>Ready to explore?</h3>
            <p>Book your tailor-made experience with us and discover the magic of Morocco.</p>
            <button class="reserve-btn" onclick="closeModal('{CITY}'); document.getElementById('contact').scrollIntoView({{behavior: 'smooth'}})">Book Now</button>
          </div>
        </div>
      </div>
{NEXT_MARKER}"""

# Ouarzazate
content = re.sub(
    r'(<!-- TOUR DETAILS SECTION -->\s*<div class="tour-details">.*?)(\s*</div>\s*</div>\s*</div>\s*<!-- Merzouga -->)',
    cta_template.format(CITY='ouarzazate', NEXT_MARKER='      <!-- Merzouga -->'),
    content, flags=re.DOTALL
)

# Merzouga
content = re.sub(
    r'(<div class="activities-luxury">.*?)(\s*</div>\s*</div>\s*</div>\s*<!-- Chefchaouen -->)',
    cta_template.format(CITY='merzouga', NEXT_MARKER='      <!-- Chefchaouen -->'),
    content, flags=re.DOTALL
)

# Chefchaouen
content = re.sub(
    r'(<div class="tour-details">\s*<h3 class="section-title">Morocco’s Grand Contrast.*?)(</div>\s*</div>\s*</div>\s*<!-- Essaouira -->)',
    cta_template.format(CITY='chefchaouen', NEXT_MARKER='      <!-- Essaouira -->'),
    content, flags=re.DOTALL
)

# Essaouira
content = re.sub(
    r'(<div class="activities-luxury">.*?)(\s*</div>\s*</div>\s*</div>\s*<!-- Fès -->|<!-- Fes -->)',
    cta_template.format(CITY='essaouira', NEXT_MARKER='      <!-- Fes -->'),
    content, flags=re.DOTALL
)

# Fes
content = re.sub(
    r'(<!-- ===== TOUR DETAILS: Fes to.*?<div class="tour-details">.*?)(\s*</div>\s*</div>\s*</div>\s*<!-- Casablanca -->)',
    cta_template.format(CITY='fes', NEXT_MARKER='      <!-- Casablanca -->'),
    content, flags=re.DOTALL
)

# Casablanca
content = re.sub(
    r'(<!-- ===== TOUR DETAILS: Casablanca.*?<div class="tour-details">.*?)(\s*</div>\s*</div>\s*</section>)',
    cta_template.format(CITY='casablanca', NEXT_MARKER='    </section>'),
    content, flags=re.DOTALL
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
