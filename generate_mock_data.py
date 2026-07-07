import json
import random

destinations = [
    ("Goa", "India", "Asia"),
    ("Manali", "India", "Asia"),
    ("Kashmir", "India", "Asia"),
    ("Dubai", "UAE", "Middle East"),
    ("Paris", "France", "Europe"),
    ("Bali", "Indonesia", "Asia"),
    ("Maldives", "Maldives", "Asia"),
    ("Phuket", "Thailand", "Asia"),
    ("Kerala", "India", "Asia"),
    ("Andaman", "India", "Asia"),
    ("Ladakh", "India", "Asia"),
    ("Singapore", "Singapore", "Asia"),
    ("Rome", "Italy", "Europe"),
    ("Swiss Alps", "Switzerland", "Europe"),
    ("London", "UK", "Europe"),
    ("New York", "USA", "North America"),
    ("Tokyo", "Japan", "Asia"),
    ("Kyoto", "Japan", "Asia"),
    ("Sydney", "Australia", "Oceania"),
    ("Cape Town", "South Africa", "Africa"),
    ("Mauritius", "Mauritius", "Africa"),
    ("Jaipur", "India", "Asia"),
    ("Udaipur", "India", "Asia"),
    ("Rishikesh", "India", "Asia"),
    ("Darjeeling", "India", "Asia"),
    ("Sikkim", "India", "Asia"),
    ("Ooty", "India", "Asia"),
    ("Munnar", "India", "Asia"),
    ("Agra", "India", "Asia"),
    ("Varanasi", "India", "Asia")
]

categories = ["Family", "Honeymoon", "Adventure", "Wildlife", "Cultural", "Beach", "Luxury"]
package_types = ["Group", "Solo", "Couple", "Customized"]
meal_plans = ["Room Only", "Breakfast", "Half Board", "Full Board", "All Inclusive"]
cancellation_policies = ["Flexible", "Moderate", "Strict", "Non-refundable"]

packages = []

for i in range(1, 31):
    dest = destinations[(i - 1) % len(destinations)]
    duration_days = random.randint(3, 10)
    duration_nights = duration_days - 1
    price = random.randint(500, 5000)
    original_price = price + random.randint(100, 1000)
    discount = round(((original_price - price) / original_price) * 100)
    
    package = {
        "id": f"pkg{i}",
        "title": f"Explore {dest[0]} - {duration_days} Days",
        "destination": dest[0],
        "country": dest[1],
        "region": dest[2],
        "category": random.choice(categories),
        "packageType": random.choice(package_types),
        "durationDays": duration_days,
        "durationNights": duration_nights,
        "pricePerPerson": price,
        "originalPrice": original_price,
        "discountPercent": discount,
        "rating": round(random.uniform(3.5, 5.0), 1),
        "reviewCount": random.randint(10, 500),
        "image": f"https://source.unsplash.com/800x600/?{dest[0].replace(' ', '')},travel",
        "gallery": [
            f"https://source.unsplash.com/800x600/?{dest[0].replace(' ', '')},landscape",
            f"https://source.unsplash.com/800x600/?{dest[0].replace(' ', '')},culture",
            f"https://source.unsplash.com/800x600/?{dest[0].replace(' ', '')},food"
        ],
        "shortDescription": f"Discover the beauty of {dest[0]} with our carefully curated {duration_days}-day itinerary.",
        "description": f"Immerse yourself in the vibrant culture and stunning landscapes of {dest[0]}. This comprehensive tour takes you through the most iconic landmarks and hidden gems. From thrilling adventures to relaxing moments, experience the best of {dest[1]}.",
        "highlights": [
            f"Guided city tour of {dest[0]}",
            "Local culinary experiences",
            "Comfortable accommodation",
            "Expert local guides"
        ],
        "inclusions": [
            "Accommodation",
            "Daily Breakfast",
            "Airport Transfers",
            "Sightseeing as per itinerary"
        ],
        "exclusions": [
            "International Flights",
            "Travel Insurance",
            "Personal Expenses",
            "Optional Tours"
        ],
        "itinerary": [
            {
                "day": j,
                "title": f"Day {j}: Activity in {dest[0]}",
                "description": f"Detailed plan for day {j} in {dest[0]}."
            } for j in range(1, duration_days + 1)
        ],
        "availableDates": [
            "2026-08-01", "2026-08-15", "2026-09-01", "2026-09-15"
        ],
        "maxGuests": random.randint(10, 30),
        "minGuests": random.randint(1, 4),
        "hotelCategory": random.choice(["3 Star", "4 Star", "5 Star"]),
        "transportIncluded": random.choice([True, False]),
        "flightIncluded": random.choice([True, False]),
        "mealPlan": random.choice(meal_plans),
        "cancellationPolicy": random.choice(cancellation_policies),
        "tags": [dest[0].lower(), dest[1].lower(), "tour", "holiday"],
        "isPopular": random.choice([True, False]),
        "isRecommended": random.choice([True, False]),
        "isTrending": random.choice([True, False])
    }
    packages.append(package)

js_content = f"export const holidayPackages = {json.dumps(packages, indent=2)};\n"

with open("/home/ajinkya-cm-pc/my_experiment/my_git_projects/travelLab/src/data/holidayPackages.js", "w") as f:
    f.write(js_content)
