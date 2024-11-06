const random = Math.random();


fetch(`https://api.alquran.cloud/v1/ayah/random/ar.asad?randomParam=${random}`)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('ayah')


    const surah = document.createElement('h1')
    surah.textContent = data.data.surah.name
    container.appendChild(surah)

    const ayah = document.createElement('p')
    ayah.textContent = `{${data.data.text}}`
    ayah.className = "text-slate-200"
    container.appendChild(ayah)

    const numberOfAyah = document.createElement('p')
    numberOfAyah.textContent = `رقم الآية ${data.data.surah.numberOfAyahs.toLocaleString('ar-EG')}`
    container.appendChild(numberOfAyah)
  })