import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Base form template
def get_form(city_id):
    return f"""          <form class="modal-form" onsubmit="event.preventDefault(); alert('Reservation requested for {city_id.capitalize()}! Our team will contact you shortly.');">
            <h3>Start Your Journey</h3>
            <div class="modal-form-row">
              <div class="input-group">
                <label>Full Name</label>
                <input type="text" required placeholder="John Doe">
              </div>
              <div class="input-group">
                <label>Phone / WhatsApp</label>
                <input type="tel" required placeholder="+212 ...">
              </div>
            </div>
            <div class="modal-form-row">
              <div class="input-group">
                <label>Travel Date</label>
                <input type="date" required>
              </div>
              <div class="input-group">
                <label>Adults</label>
                <select required>
                  <!-- Forced minimum of 2 adults -->
                  <option value="2" selected>2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6+">6+</option>
                </select>
              </div>
            </div>
            <button type="submit" class="reserve-btn">Confirm Reservation</button>
            <p class="pax-note">🎟️ Note : Réservation valable à partir de 2 personnes minimum.</p>
          </form>"""

# Fes specific promotion table + form
fes_content = """          <div class="promo-table-container">
            <h4><i class="fa-solid fa-tags"></i> Fès Special Promotions</h4>
            <table class="promo-table">
              <tr>
                <th>Group Size</th>
                <th>Discount</th>
              </tr>
              <tr>
                <td>2 - 3 People</td>
                <td><strong>5% OFF</strong></td>
              </tr>
              <tr>
                <td>4 - 5 People</td>
                <td><strong>10% OFF</strong></td>
              </tr>
              <tr>
                <td>6+ People</td>
                <td><strong>15% OFF + Free Dinner</strong></td>
              </tr>
            </table>
          </div>
""" + get_form('fes')

cities = ['ouarzazate', 'merzouga', 'chefchaouen', 'essaouira', 'fes', 'casablanca']

for city in cities:
    # Build regex to find the specific modal-reservation block for this city
    # The block looks like:
    # <div class="modal-reservation">
    #   <h3>Ready to explore?</h3>
    #   <p>Book your tailor-made experience with us and discover the magic of Morocco.</p>
    #   <button class="reserve-btn" onclick="closeModal('CITY'); document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">Book Now</button>
    # </div>
    
    pattern = re.compile(
        r'<div class="modal-reservation">\s*<h3>Ready to explore\?</h3>\s*<p>Book your tailor-made experience with us and discover the magic of Morocco\.</p>\s*<button class="reserve-btn" onclick="closeModal\(\'' + city + r'\'\); document\.getElementById\(\'contact\'\)\.scrollIntoView\(\{behavior: \'smooth\'\}\)">Book Now</button>\s*</div>'
    )
    
    if city == 'fes':
        replacement = fes_content
    else:
        replacement = get_form(city)
        
    html = pattern.sub(replacement, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
