import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

cta_template = """
          <!-- Reservation CTA -->
          <div class="modal-reservation">
            <h3>Ready to explore?</h3>
            <p>Book your tailor-made experience with us and discover the magic of Morocco.</p>
            <button class="reserve-btn" onclick="closeModal('{CITY}'); document.getElementById('contact').scrollIntoView({{behavior: 'smooth'}})">Book Now</button>
          </div>
"""

# 1. Chefchaouen: replace the .marr-exp block with CTA
chef_pattern = r'(<!-- Chefchaouen -->.*?)(<!-- ===== MAGNIFICENT ACCORDION : Expériences Chefchaouen ===== -->\s*<div class="marr-exp">.*?</div>\s*</div>)(\s*</div>\s*</div>\s*<!-- Essaouira -->)'
html = re.sub(chef_pattern, lambda m: m.group(1) + cta_template.format(CITY='chefchaouen') + m.group(3), html, flags=re.DOTALL)

# 2. Fes: replace the .marr-exp block with CTA
fes_pattern = r'(<!-- Fès -->|<!-- Fes -->)(.*?)(<!-- ===== MAGNIFICENT ACCORDION : Expériences Fes ===== -->\s*<div class="marr-exp">.*?</div>\s*</div>)(\s*</div>\s*</div>\s*<!-- Casablanca -->)'
html = re.sub(fes_pattern, lambda m: m.group(1) + m.group(2) + cta_template.format(CITY='fes') + m.group(4), html, flags=re.DOTALL)

# 3. Casablanca: replace the .marr-exp block with CTA
casa_pattern = r'(<!-- Casablanca -->.*?)(<!-- ===== MAGNIFICENT ACCORDION : Expériences Casablanca ===== -->\s*<div class="marr-exp">.*?</div>\s*</div>)(\s*</div>\s*</div>\s*</section>)'
html = re.sub(casa_pattern, lambda m: m.group(1) + cta_template.format(CITY='casablanca') + m.group(3), html, flags=re.DOTALL)

# 4. Ouarzazate, Merzouga, Essaouira: append CTA to the end of the modal-content
ouarzazate_pattern = r'(<!-- Ouarzazate -->.*?)(\s*</div>\s*</div>\s*<!-- Merzouga -->)'
html = re.sub(ouarzazate_pattern, lambda m: m.group(1) + cta_template.format(CITY='ouarzazate') + m.group(2), html, flags=re.DOTALL)

merzouga_pattern = r'(<!-- Merzouga -->.*?)(\s*</div>\s*</div>\s*<!-- Chefchaouen -->)'
html = re.sub(merzouga_pattern, lambda m: m.group(1) + cta_template.format(CITY='merzouga') + m.group(2), html, flags=re.DOTALL)

essaouira_pattern = r'(<!-- Essaouira -->.*?)(\s*</div>\s*</div>\s*(?:<!-- Fès -->|<!-- Fes -->))'
html = re.sub(essaouira_pattern, lambda m: m.group(1) + cta_template.format(CITY='essaouira') + m.group(2), html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
