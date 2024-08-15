const selectElement = document.getElementById('user-city');

// for making the option tags
cities.forEach((city) => {
  const option = document.createElement('option');
  option.value = city.code;
  option.textContent = city.name;
  selectElement.appendChild(option);
});

// Reading from the Local storage
const storedCityCode = localStorage.getItem('user-city');

if (storedCityCode) {
  selectElement.value = storedCityCode;
} else {
  document.getElementById('set').classList.remove('hidden');
}

selectElement.addEventListener('change', (e) => {
  const selectedCityCode = e.target.value;
  localStorage.setItem('user-city', selectedCityCode);

  getInfo(selectedCityCode);
  location.reload();
});


const prayTimesContainer = document.getElementById('pray-times');
const cityDateContainer = document.getElementById('city-date');
// Function to get prayer time information
function getInfo(cityCode) {
  if (localStorage.getItem('user-city')) {
    fetch(`https://api.aladhan.com/v1/timingsByCity/:date?country=SA&city=${cityCode}&method=4&adjustment=-1`)
      .then(response => response.json())
      .then(data => {
        //date and place apepend
        cityDateContainer.innerHTML = '';
        const cityName = document.createElement('p');
        cityName.textContent = document.getElementById('user-city').options[document.getElementById('user-city').selectedIndex].text;
        cityName.classList = 'text-2xl text-bold text-gray-800'
        cityDateContainer.appendChild(cityName);

        const hijriDate = document.createElement('p');
        hijriDate.textContent = `تاريخ اليوم ${Number(data.data.date.hijri.day).toLocaleString('ar-EG', { useGrouping: false })} ${data.data.date.hijri.month.ar} ${Number(data.data.date.hijri.year).toLocaleString('ar-EG', { useGrouping: false })} هـ`;
        hijriDate.classList = 'text-lg text-semibold text-gray-800 pr-1'
        cityDateContainer.appendChild(hijriDate);

        prayTimesContainer.innerHTML = '';
        

        const fajrTime = document.createElement('p');
        fajrTime.textContent = `الفجر ${convertTo12(data.data.timings.Fajr)}`;
        fajrTime.classList = 'border flex-grow p-1 text-center';

        const dhuhrTime = document.createElement('p');
        dhuhrTime.textContent = `الظهر ${convertTo12(data.data.timings.Dhuhr)}`;
        dhuhrTime.classList = 'border flex-grow p-1 text-center';

        const asrTime = document.createElement('p');
        asrTime.textContent = `العصر ${convertTo12(data.data.timings.Asr)}`;
        asrTime.classList = 'border flex-grow p-1 text-center';

        const maghribTime = document.createElement('p');
        maghribTime.textContent = `المغرب ${convertTo12(data.data.timings.Maghrib)}`;
        maghribTime.classList = 'border flex-grow p-1 text-center';

        const ishaTime = document.createElement('p');
        ishaTime.textContent = `العشاء ${convertTo12(data.data.timings.Isha)}`;
        ishaTime.classList = 'border flex-grow p-1 text-center';

        const tableContainer = document.createElement('div');
        tableContainer.classList = 'flex flex-row justify-center items-center flex-wrap w-full gap-6';

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
  } else {
    cityDateContainer.innerHTML = '';
    prayTimesContainer.classList = "flex flex-row justify-center items-center h-16 w-full font-bold text-lg text-nowrap"
    prayTimesContainer.innerHTML = 'الرجاء اختيار مدينتك من خانة الإعدادات'
  }
}

// init the the function
getInfo(storedCityCode);