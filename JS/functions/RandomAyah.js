const random = Math.random();


fetch(`http://api.alquran.cloud/v1/ayah/random/ar.asad?randomParam=${random}`)
  .then(response => response.json())
  .then(data =>{
    const container = document.getElementById('ayah')


        const surah = document.createElement('h1')
        surah.textContent = data.data.surah.name
        container.appendChild(surah)

    const ayah = document.createElement('p')
    ayah.textContent = `{${data.data.text}}`
    container.appendChild(ayah)

    const numberOfAyah = document.createElement('p')
    numberOfAyah.textContent = `رقم الآية ${data.data.surah.numberOfAyahs.toLocaleString('ar-EG')}`
    container.appendChild(numberOfAyah)
  })