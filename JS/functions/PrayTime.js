const cities= [
  {
    "name": "الرياض",
    "code": "Riyadh"
  },
  {
    "name": "جدة",
    "code": "Jeddah"
  },
  {
    "name": "مكة المكرمة",
    "code": "Mecca"
  },
  {
    "name": "المدينة المنورة",
    "code": "Medina"
  },
  {
    "name": "الدمام",
    "code": "Dammam"
  },
  {
    "name": "بريدة",
    "code": "Buraidah"
  },
  {
    "name": "تبوك",
    "code": "Tabuk"
  },
  {
    "name": "أبها",
    "code": "Abha"
  },
  {
    "name": "خميس مشيط",
    "code": "Khamis Mushait"
  },
  {
    "name": "حائل",
    "code": "Hail"
  },
  {
    "name": "ينبع",
    "code": "Yanbu"
  },
  {
    "name": "الطائف",
    "code": "Taif"
  },
  {
    "name": "الخبر",
    "code": "Khobar"
  },
  {
    "name": "الجبيل",
    "code": "Jubail"
  },
  {
    "name": "أبو عريش",
    "code": "Abu Arish"
  },
  {
    "name": "نجران",
    "code": "Najran"
  },
  {
    "name": "القطيف",
    "code": "Qatif"
  },
  {
    "name": "الحفر",
    "code": "Hafar Al-Batin"
  },
  {
    "name": "الرس",
    "code": "Ar Rass"
  },
  {
    "name": "سكاكا",
    "code": "Sakaka"
  },
  {
    "name": "الباحة",
    "code": "Al Baha"
  },
  {
    "name": "عرعر",
    "code": "Arar"
  },
  {
    "name": "الزلفي",
    "code": "Zulfi"
  },
  {
    "name": "بيشة",
    "code": "Bisha"
  },
  {
    "name": "تاروت",
    "code": "Tarout"
  },
  {
    "name": "الدوادمي",
    "code": "Ad Dawadimi"
  },
  {
    "name": "العرضيات",
    "code": "Al Artawiyah"
  },
  {
    "name": "الخفجي",
    "code": "Khafji"
  },
  {
    "name": "القريات",
    "code": "Al Qurayyat"
  },
  {
    "name": "الرميلة",
    "code": "Ar Rameelah"
  },
  {
    "name": "الظهران",
    "code": "Dhahran"
  },
  {
    "name": "الأحساء",
    "code": "Al Hasa"
  },
  {
    "name": "سيهات",
    "code": "Saihat"
  },
  {
    "name": "الخرج",
    "code": "Al Kharj"
  },
  {
    "name": "العيون",
    "code": "Al Ahsa"
  },
  {
    "name": "الهفوف",
    "code": "Al Hofuf"
  },
  {
    "name": "المبرز",
    "code": "Al Mubarraz"
  },
  {
    "name": "الهجرة",
    "code": "Al Hijr"
  },
  {
    "name": "الجفر",
    "code": "Al Jifir"
  },
  {
    "name": "القرين",
    "code": "Al Qarin"
  },
  {
    "name": "الفوارة",
    "code": "Al Fawarah"
  },
  {
    "name": "العقير",
    "code": "Al Aqeer"
  },
  {
    "name": "المناصفة",
    "code": "Al Munawwafah"
  },
  {
    "name": "المبروكة",
    "code": "Al Mubaraka"
  },
  {
    "name": "الخفاجية",
    "code": "Al Khafajiyya"
  },
  {
    "name": "الجبيلة",
    "code": "Al Jubaylah"
  },
  {
    "name": "الشهار",
    "code": "Al Shahar"
  },
  {
    "name": "القائم",
    "code": "Al Qaim"
  },
  {
    "name": "الصفا",
    "code": "As Safa"
  },
  {
    "name": "العقيرة",
    "code": "Al Uqayrah"
  },
  {
    "name": "الخفجي",
    "code": "Al Khafji"
  },
  {
    "name": "القويعية",
    "code": "Al Qawiyah"
  },
  {
    "name": "العبيكان",
    "code": "Al Ubikan"
  },
  {
    "name": "الجلفاء",
    "code": "Al Jilfa"
  }
];



const selectElement = document.getElementById('user-city');

// Populate the select element with city options
cities.forEach((city) => {
  const option = document.createElement('option');
  option.value = city.code;
  option.textContent = city.name;
  selectElement.appendChild(option);
});

// Read the selected city code from local storage
const storedCityCode = localStorage.getItem('user-city');

if (storedCityCode) {
  selectElement.value = storedCityCode;
}

selectElement.addEventListener('change', (e) => {
  const selectedCityCode = e.target.value;
  localStorage.setItem('user-city', selectedCityCode);

  getInfo(selectedCityCode);
});


const prayTimesContainer = document.getElementById('pray-times');
const cityDateContainer = document.getElementById('city-date');
// Function to get prayer time information
function getInfo(cityCode) {
  fetch(`https://api.aladhan.com/v1/timingsByCity/:date?country=SA&city=${cityCode}&method=4&adjustment=-1`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      //date and place apepend
      cityDateContainer.innerHTML = '';
      const cityName = document.createElement('p');
      cityName.textContent = document.getElementById('user-city').options[document.getElementById('user-city').selectedIndex].text;
      cityName.classList = 'text-2xl text-bold text-gray-800'
      cityDateContainer.appendChild(cityName);

      const hijriDate = document.createElement('p');
      hijriDate.textContent = `تاريخ اليوم ${
        Number(data.data.date.hijri.day).toLocaleString('ar-EG', { useGrouping: false })} ${data.data.date.hijri.month.ar} ${Number(data.data.date.hijri.year).toLocaleString('ar-EG', { useGrouping: false })} هـ`;
      hijriDate.classList = 'text-lg text-semibold text-gray-800 pr-1'
      cityDateContainer.appendChild(hijriDate);

      prayTimesContainer.innerHTML = '';

      const fajrTime = document.createElement('p');
      fajrTime.textContent = `الفجر ${convertTo12(data.data.timings.Fajr)}`;
      fajrTime.classList = 'border p-1 text-center';

      const dhuhrTime = document.createElement('p');
      dhuhrTime.textContent =  `الظهر ${convertTo12(data.data.timings.Dhuhr)}`;
      dhuhrTime.classList = 'border p-1 text-center';

      const asrTime = document.createElement('p');
      asrTime.textContent =  `العصر ${convertTo12(data.data.timings.Asr)}`;
      asrTime.classList = 'border p-1 text-center';

      const maghribTime = document.createElement('p');
      maghribTime.textContent =  `المغرب ${convertTo12(data.data.timings.Maghrib)}`;
      maghribTime.classList = 'border p-1 text-center';

      const ishaTime = document.createElement('p');
      ishaTime.textContent = `العشاء ${convertTo12(data.data.timings.Isha)}`;
      ishaTime.classList = 'border p-1 text-center';

      const tableContainer = document.createElement('div');
      tableContainer.classList = 'flex justify-center items-center gap-4';

      tableContainer.appendChild(fajrTime);
      tableContainer.appendChild(dhuhrTime);
      tableContainer.appendChild(asrTime);
      tableContainer.appendChild(maghribTime);
      tableContainer.appendChild(ishaTime);

      prayTimesContainer.appendChild(tableContainer);
      
      // convert to 12 hour format
      function convertTo12(time) {
        const [hours, minutes] = time.split(':');
        let period = 'ص';
      
        let formattedHours = parseInt(hours, 10);
        if (formattedHours >= 12) {
          period = 'م';
          formattedHours = (formattedHours % 12) || 12;
        }
      
        return `${Number(formattedHours).toLocaleString('ar-EG')}:${Number(minutes).toLocaleString('ar-EG')}${period}`;
      }
      

      
    })
    .catch(error => {
      console.error('Error fetching prayer time information:', error);
    });
}

// Initial call to get prayer time information based on the sto city
getInfo(storedCityCode);