/**
 * ECOLIFE - Centralized Datasets
 * Animals, Quiz Questions, Recycling Categories, 20 Eco Tips, Search Index
 */

const EcoData = {
  // 1. Search Index for global search modal
  searchIndex: [
    { title: "Bosh sahifa", url: "index.html", category: "Sahifalar", snippet: "EcoLife ekologik platformasi bosh sahifasi" },
    { title: "Tabiat — bizning umumiy uyimiz", url: "nature.html", category: "Sahifalar", snippet: "O'rmonlar, okeanlar, tog'lar va biologik xilma-xillik" },
    { title: "Chiqindilarni qayta ishlash", url: "recycling.html", category: "Sahifalar", snippet: "Plastik, qog'oz, shisha, metall, organik va saralash o'yini" },
    { title: "Suvni tejash", url: "water.html", category: "Sahifalar", snippet: "Suvni tejash usullari va interaktiv suv kalkulyatori" },
    { title: "Energiyani tejash", url: "energy.html", category: "Sahifalar", snippet: "Energiyani tejash odatlari va elektr kalkulyatori" },
    { title: "Daraxtlar — yashil qalqon", url: "trees.html", category: "Sahifalar", snippet: "Daraxtlarning ahamiyati va virtual daraxt ekish" },
    { title: "Yovvoyi tabiatni asraylik", url: "animals.html", category: "Sahifalar", snippet: "Yo'qolib borayotgan jonivorlar, yashash joylari va muhofaza" },
    { title: "Eco Quiz (Viktorina)", url: "quiz.html", category: "Sahifalar", snippet: "Siz qanchalik eco-smart siz? 10 ta savolli viktorina" },
    { title: "Ekologik iz kalkulyatori", url: "calculator.html", category: "Sahifalar", snippet: "Shaxsiy karbon izingizni hisoblang va tavsiyalar oling" },
    { title: "20 ta foydali eco-odat", url: "tips.html", category: "Sahifalar", snippet: "Har kuni bajarish mumkin bo'lgan 20 ta amaliy maslahat" },
    // Animals
    { title: "Katta Panda", url: "animals.html#panda", category: "Hayvonlar", snippet: "Bambuk o'rmonlarida yashovchi noyob sutemizuvchi" },
    { title: "Dengiz Toshbaqasi", url: "animals.html#turtle", category: "Hayvonlar", snippet: "Okeanlar ekotizimining qadimiy qo'riqchisi" },
    { title: "Qor Barsi (Ilvirs)", url: "animals.html#snow-leopard", category: "Hayvonlar", snippet: "Markaziy Osiyo baland tog'larining shohi" },
    { title: "Sayg'oq", url: "animals.html#saiga", category: "Hayvonlar", snippet: "Orolbo'yi va dashtlarning noyob antilopasi" },
    { title: "Asalari", url: "animals.html#bee", category: "Hayvonlar", snippet: "O'simliklar va qishloq xo'jaligining asosiy changlatuvchisi" },
    // Recycling
    { title: "Plastik chiqindilar", url: "recycling.html#plastic", category: "Qayta ishlash", snippet: "Plastik butilkalarni to'g'ri topshirish va zarari" },
    { title: "Batareyalar utilizatsiyasi", url: "recycling.html#batteries", category: "Qayta ishlash", snippet: "Xavfli kimyoviy elementlarni tuproqqa tushishidan saqlash" }
  ],

  // 2. Animals Database
  animals: [
    {
      id: "panda",
      name: "Katta Panda",
      scientificName: "Ailuropoda melanoleuca",
      category: "mammals",
      status: "Zaif (Vulnerable)",
      statusClass: "badge-warning",
      habitat: "Bambukli tog' o'rmonlari (Xitoy)",
      icon: "🐼",
      description: "Katta panda kunining 12-14 soatini faqat bambuk iste'mol qilish bilan o'tkazadi. Ular Xitoyning timsoli va dunyo yovvoyi tabiatini muhofaza qilish ramzi hisoblanadi.",
      fact: "Bitta katta panda kuniga 12 dan 38 kilogrammgacha bambuk yeyishi mumkin!",
      conservationTip: "Bambuk o'rmonlarini kesishdan saqlash va yovvoyi tabiat koridorlarini tiklash."
    },
    {
      id: "turtle",
      name: "Dengiz Toshbaqasi",
      scientificName: "Cheloniidae",
      category: "marine",
      status: "Xavf ostida (Endangered)",
      statusClass: "badge-danger",
      habitat: "Iliq tropik va subtropik okean suvlari",
      icon: "🐢",
      description: "Dengiz toshbaqalari 100 million yildan ortiq vaqtdan beri okeanlarda suzib yurishadi. Ular dengiz o'tlari va meduzalar populyatsiyasini muvozanatda ushlab turadi.",
      fact: "Ular tuxum qo'yish uchun aynan o'zlari tug'ilgan plyajga minglab kilometr suzib keladilar.",
      conservationTip: "Bir martalik plastiklardan voz keching, chunki ular toshbaqalar tomonidan meduza deb yanglishib yutiladi."
    },
    {
      id: "elephant",
      name: "Osiyo Fili",
      scientificName: "Elephas maximus",
      category: "mammals",
      status: "Xavf ostida (Endangered)",
      statusClass: "badge-danger",
      habitat: "Janubiy va Janubi-Sharqiy Osiyo o'rmonlari",
      icon: "🐘",
      description: "Fillar 'ekotizim muhandislari' deb ataladi. Ular o'rmonlarda yo'laklar ochib, boshqa jonivorlarga yo'l beradi va o'simlik urug'larini uzoq masofalarga tarqatadi.",
      fact: "Filning xartumida 40,000 dan ortiq mushak tolalari bo'lib, u yerdagi kichik ignani ham ko'tara oladi.",
      conservationTip: "Fil suyagidan yasalgan har qanday suvenirlarni xarid qilishdan butunlay bosh torting."
    },
    {
      id: "snow-leopard",
      name: "Qor Barsi (Ilvirs)",
      scientificName: "Panthera uncia",
      category: "mammals",
      status: "Zaif (Qizil Kitob)",
      statusClass: "badge-danger",
      habitat: "Markaziy Osiyo va Tyan-Shan baland tog'lari",
      icon: "🐆",
      description: "Qor barsi - tog'larning sirli va epchil yirtqichi. O'zbekistonning Hisor va Chotqol tog' tizmalarida ham kam sonli populyatsiyasi mavjud.",
      fact: "Qor barsi o'z gavdasi uzunligidan 6 baravar uzoqqa (15 metrgacha) sakray oladi!",
      conservationTip: "Baland tog' ekotizimlarini asrash, noqonuniy ovchilik (brakonyerlik)ga qarshi qat'iy kurashish."
    },
    {
      id: "tiger",
      name: "Amur Yo'lbarsi",
      scientificName: "Panthera tigris altaica",
      category: "mammals",
      status: "Kritik xavf ostida",
      statusClass: "badge-danger",
      habitat: "Tayga va ignabargli o'rmonlar",
      icon: "🐯",
      description: "Dunyoning eng yirik mushuksimon yirtqichi. O'rmon ekotizimlarining sog'lomligini ta'minlovchi eng yuqori darajadagi zanjir halqasi.",
      fact: "Hech qaysi ikki yo'lbarsning chiziqlari bir xil bo'lmaydi — bu inson barmoq izi kabi noyobdir.",
      conservationTip: "O'rmonlarni saqlash va qat'iy qo'riqlanadigan tabiat hududlarini kengaytirish."
    },
    {
      id: "saiga",
      name: "Sayg'oq",
      scientificName: "Saiga tatarica",
      category: "mammals",
      status: "Zaif (O'zbekiston Qizil Kitobi)",
      statusClass: "badge-warning",
      habitat: "Ustyurt platosi va Orolbo'yi dashtlari",
      icon: "🦌",
      description: "Muzlik davridan omon qolgan qadimiy antilopa. Uning o'ziga xos xartumsimon burni qishda sovuq havoni isitadi, yozda esa dasht changini filtrlaydi.",
      fact: "Sayg'oqlar soatiga 80 km tezlikda yugura oladi va kuniga yuzlab kilometr masofani bosib o'tadi.",
      conservationTip: "Ustyurt platosidagi migratsiya yo'llarini to'siqlarsiz saqlash va dasht qo'riqxonalari tuzish."
    },
    {
      id: "butterfly",
      name: "Monarx Kapalagi",
      scientificName: "Danaus plexippus",
      category: "insects",
      status: "Xavf ostida (Endangered)",
      statusClass: "badge-danger",
      habitat: "Shimoliy va Markaziy Amerika gulzorlari",
      icon: "🦋",
      description: "Ushbu kapalaklar tabiatdagi eng hayratlanarli migratsiyalardan birini amalga oshirib, 4000 kilometrgacha parvoz qiladi.",
      fact: "Monarx kapalaklari Yerdagi magnit maydon va quyosh harakati orqali yo'nalishni aniqlaydi.",
      conservationTip: "Pestitsidlardan foydalanishni kamaytirish va ko'proq yovvoyi gullar ekish."
    },
    {
      id: "bee",
      name: "Asalari",
      scientificName: "Apis mellifera",
      category: "insects",
      status: "Populyatsiyasi kamaymoqda",
      statusClass: "badge-warning",
      habitat: "Butun dunyo bo'ylab o'tloq va bog'lar",
      icon: "🐝",
      description: "Insoniyat iste'mol qiladigan meva, sabzavot va yong'oqlarning 75% dan ortig'i aynan asalarilar tomonidan changlatiladi.",
      fact: "Bitta asalari o'z hayoti davomida bor-yo'g'i bir choy qoshiqning 1/12 qismi miqdorida asal to'playdi.",
      conservationTip: "Hovli va bog'larda kimyoviy zaharlar ishlatmaslik, nektarga boy mahalliy gullar yetishtirish."
    },
    {
      id: "polar-bear",
      name: "Oq Ayiq",
      scientificName: "Ursus maritimus",
      category: "mammals",
      status: "Zaif (Vulnerable)",
      statusClass: "badge-warning",
      habitat: "Arktika muzliklari",
      icon: "🐻‍❄️",
      description: "Arktikaning eng qudratli yirtqichi bo'lib, uning hayoti to'liq dengiz muzliklari bilan bog'liq. Iqlim isishi tufayli muzlar erib, ovi qiyinlashmoqda.",
      fact: "Oq ayiqning terisi osti qora rangda bo'lib, u quyosh issiqligini maksimal darajada singdirishga yordam beradi.",
      conservationTip: "Global isishni to'xtatish uchun karbonat angidrid chiqindilarini keskin kamaytirish."
    },
    {
      id: "dolphin",
      name: "Moviy Delfin",
      scientificName: "Delphinus delphis",
      category: "marine",
      status: "Muhofazaga muhtoj",
      statusClass: "badge-warning",
      habitat: "Iliq dengiz va okeanlar",
      icon: "🐬",
      description: "Yuksak aql va his-tuyg'ularga ega dengiz sutemizuvchisi. Ular suvdagi tovush to'lqinlari (exolokatsiya) orqali muloqot qiladilar.",
      fact: "Delfinlar uxlayotganlarida ularning miyasining faqat yarmi dam oladi, ikkinchi yarmi nafas olish uchun uyg'oq turadi.",
      conservationTip: "Plastik chiqindilar va dengizdagi noqonuniy baliq to'rlaridan voz kechish."
    }
  ],

  // 3. Quiz Questions (10 Comprehensive questions)
  quizQuestions: [
    {
      id: 1,
      question: "Plastik butilka tabiatda to'liq parchalanishi uchun o'rtacha qancha vaqt talab etiladi?",
      options: [
        "10-20 yil",
        "50-100 yil",
        "400-450 yil",
        "1000 yildan ortiq"
      ],
      correct: 2,
      explanation: "Standart plastik (PET) butilka tabiatda parchalanishi uchun taxminan 450 yil kerak bo'ladi va u mikroplastik shaklida tuproq hamda suvda saqlanib qoladi."
    },
    {
      id: 2,
      question: "Yer atmosferasidagi kislorodning asosiy qismi qayerda hosil bo'ladi?",
      options: [
        "Amazonka tropik o'rmonlarida",
        "Okeanlardagi fitoplankton va suv o'tlarida",
        "Sibir ignabargli taygasida",
        "Tog' o'simliklarida"
      ],
      correct: 1,
      explanation: "Sayyoramizdagi jami kislorodning 50% dan 80% gacha bo'lgan qismi okeanlarda yashovchi mayda fitoplanktonlar va dengiz o'tlari orqali fotosintez natijasida hosil bo'ladi."
    },
    {
      id: 3,
      question: "Tish yuvayotganda kran suvini ochiq qoldirmaslik bir martada taxminan qancha suvni tejaydi?",
      options: [
        "1-2 litr",
        "5-15 litr",
        "30-40 litr",
        "Hech qancha tejamaydi"
      ],
      correct: 1,
      explanation: "Oddiy suv krani minutiga 6-10 litr suv chiqaradi. 2 daqiqa tish yuvish davomida kranni yopib qo'yish orqali 12-15 litrgacha toza ichimlik suvi tejaladi."
    },
    {
      id: 4,
      question: "Quyidagilardan qaysi biri qayta tiklanuvchi energiya manbai hisoblanmaydi?",
      options: [
        "Quyosh panellari",
        "Shamol generatorlari",
        "Tabiiy gaz",
        "Gidroelektr stansiyalari"
      ],
      correct: 2,
      explanation: "Tabiiy gaz qazilma yoqilg'i bo'lib, uning zaxirasi cheklangan va yonish jarayonida atmosferaga karbonat angidrid (CO2) chiqaradi."
    },
    {
      id: 5,
      question: "1 tonna qog'ozni qayta ishlash orqali taxminan nechta katta daraxtni kesilishdan saqlab qolish mumkin?",
      options: [
        "3 ta",
        "7 ta",
        "17 ta",
        "50 ta"
      ],
      correct: 2,
      explanation: "1 tonna makulaturani qayta ishlash orqali 17 ta yetuk daraxt, 26,000 litr suv va 4000 kVt elektr energiyasi tejaladi."
    },
    {
      id: 6,
      question: "Bitta oddiy barmog'dek keladigan (AA) batareya tuproqqa tashlansa, qancha maydonni ifloslantiradi?",
      options: [
        "1 kvadrat santimetr",
        "20 kvadrat metr tuproq yoki 400 litr suv",
        "100 kvadrat metr",
        "Batareya tuproqni ifloslantirmaydi"
      ],
      correct: 1,
      explanation: "Bitta batareyadagi og'ir metallar (qo'rg'oshin, kadmiy, simob) taxminan 20 kvadrat metr tuproqni yoki 400 litr yer osti suvini zaharli kimyoviy moddalar bilan ifloslantirishi mumkin."
    },
    {
      id: 7,
      question: "Oziq-ovqat va meva-sabzavot qoldiqlaridan qanday qilib foydali foydalanish mumkin?",
      options: [
        "Plastik paketga solib poligonlarga yuborish",
        "Kompost qilib tabiiy o'g'itga aylantirish",
        "Yoqib yuborish",
        "Kanalizatsiyaga oqizish"
      ],
      correct: 1,
      explanation: "Organik chiqindilarni kompostlash orqali eng unumdor tabiiy tuproq o'g'iti hosil bo'ladi va metan gazi ajralib chiqishi kamayadi."
    },
    {
      id: 8,
      question: "LED tejamkor lampochkalar oddiy cho'g'lanma lampalarga qaraganda qancha foiz kamroq energiya sarflaydi?",
      options: [
        "20-30%",
        "40-50%",
        "75-85%",
        "Bir xil sarflaydi"
      ],
      correct: 2,
      explanation: "LED lampalari eski cho'g'lanma lampochkalarga nisbatan 80% gacha kam elektr sarflaydi va 15-25 barobar uzoqroq xizmat qiladi."
    },
    {
      id: 9,
      question: "Yer yuzidagi umumiy suv zaxirasining necha foizini toza ichimlik (chuchuk) suvi tashkil etadi?",
      options: [
        "Faqat 2.5 - 3%",
        "15%",
        "30%",
        "50%"
      ],
      correct: 0,
      explanation: "Dunyodagi suvning 97% dan ortig'i sho'r okean suvlari. Faqatgina 2.5-3% chuchuk suv bo'lib, uning ham aksariyati Arktika va tog' muzliklarida muzlagan holda joylashgan."
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi biri insonning ekologik (karbon) izini eng ko'p kamaytirishga yordam beradi?",
      options: [
        "Qisqa masofalarga mashina o'rniga velosipedda yoki piyoda yurish",
        "Mavsumiy va mahalliy mahsulotlarni xarid qilish",
        "Kiyimlarni keraksiz yangilamaslik va qayta ishlatish",
        "Yuqoridagilarning barchasi"
      ],
      correct: 3,
      explanation: "Ekologik izni kamaytirish har tomonlama yondashuvni talab qiladi: yashil transport, mahalliy mahsulotlar va ongli iste'mol madaniyati umumiy chiqindilarni keskin pasaytiradi."
    }
  ],

  // 4. Recycling Categories
  recyclingCategories: [
    {
      id: "plastic",
      title: "Plastik (Plastic)",
      icon: "♻️",
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.15)",
      description: "Ichimlik butilkalari, oziq-ovqat idishlari, polietilen paketlar va qadoqlar.",
      whyMatters: "Plastik neft mahsulotlaridan tayyorlanadi va parchalanishi uchun asrlar ketadi. U daryolar va okeanlarni ifloslantirib, hayvonlar hayotiga xavf soladi.",
      howToDispose: "Butilkalarni yuvib, ichidagi suyuqlikni to'kib tashlang. Qopqog'ini alohida yig'ing va idishni ezib, hajmini kichraytirib maxsus sariq qutilarga tashlang."
    },
    {
      id: "paper",
      title: "Qog'oz (Paper)",
      icon: "📄",
      color: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.15)",
      description: "Gazeta va jurnallar, karton qutilar, ofis qog'ozlari, daftarlar va kitoblar.",
      whyMatters: "Qog'oz ishlab chiqarish ulkan o'rmonlarning kesilishiga sabab bo'ladi. Qog'ozni 5-7 martagacha qayta ishlash mumkin!",
      howToDispose: "Qog'oz quruq va toza bo'lishi kerak. Yog'li pitsa qutilari yoki laminatsiyalangan yaltiroq qog'ozlar qayta ishlashga yaramaydi."
    },
    {
      id: "glass",
      title: "Shisha (Glass)",
      icon: "🍾",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.15)",
      description: "Sharbat va dori butilkalari, konserva bankalari, shisha idishlar.",
      whyMatters: "Shisha 100% qayta ishlanadigan noyob materialdir! U sifatini yo'qotmagan holda cheksiz marta eritilib, yangi idishlarga aylantiriladi.",
      howToDispose: "Yorliqlarini olib tashlash shart emas, lekin idishni chayqab, toza holga keltiring. Singan oyna va deraza shishalarini alohida xavfsiz o'rab topshiring."
    },
    {
      id: "metal",
      title: "Metall (Metal)",
      icon: "🥫",
      color: "#6b7280",
      bgColor: "rgba(107, 114, 128, 0.15)",
      description: "Alyuminiy ichimlik bankalari, konserva qutilari, metall qopqoqlar va folga.",
      whyMatters: "Alyuminiyni xomashyodan (boksitdan) olish juda ko'p energiya talab qiladi. Qayta ishlangan alyuminiy esa 95% kamroq energiya sarflaydi!",
      howToDispose: "Oziq-ovqat qoldiqlaridan tozalang, quritib ezilgan holda metall konteyneriga topshiring."
    },
    {
      id: "organic",
      title: "Organik chiqindi (Organic)",
      icon: "🍎",
      color: "#84cc16",
      bgColor: "rgba(132, 204, 22, 0.15)",
      description: "Meva va sabzavot po'stloqlari, choy va kofe quyqasi, quruq barglar va o'tlar.",
      whyMatters: "Organik moddalar umumiy chiqindining 40-50% ini tashkil qiladi. Ular poligonlarda chirib, xavfli metan gazi hosil qiladi.",
      howToDispose: "Ushbu chiqindilarni alohida ajratib, kompost idishlariga soling yoki tomorqa tuprog'iga o'g'it sifatida ko'ming."
    },
    {
      id: "batteries",
      title: "Batareyalar va E-chiqindi",
      icon: "🔋",
      color: "#ef4444",
      bgColor: "rgba(239, 68, 68, 0.15)",
      description: "Barcha turdagi barmoqli batareyalar, akkumulyatorlar, eski telefon va simlar.",
      whyMatters: "Batareyalar ichida simob, kadmiy, litiy kabi o'ta zaharli moddalar bor. Ular hech qachon oddiy axlat qutisiga tashlanmasligi kerak!",
      howToDispose: "Supermarketlar, maishiy texnika do'konlari yoki eko-markazlardagi maxsus qizil batareya yig'ish qutilariga topshiring."
    }
  ],

  // 5. Waste Sorting Game Items
  sortingGameItems: [
    { id: 1, name: "Plastik butilka", icon: "🥤", category: "plastic", categoryName: "Plastik" },
    { id: 2, name: "Olma po'chog'i", icon: "🍎", category: "organic", categoryName: "Organik" },
    { id: 3, name: "Eski gazeta", icon: "📰", category: "paper", categoryName: "Qog'oz" },
    { id: 4, name: "Konserva bankasi", icon: "🥫", category: "metal", categoryName: "Metall" },
    { id: 5, name: "Shisha banka", icon: "🫙", category: "glass", categoryName: "Shisha" },
    { id: 6, name: "AA Batareyasi", icon: "🔋", category: "batteries", categoryName: "Batareyalar" },
    { id: 7, name: "Karton quti", icon: "📦", category: "paper", categoryName: "Qog'oz" },
    { id: 8, name: "Banan po'sti", icon: "🍌", category: "organic", categoryName: "Organik" },
    { id: 9, name: "Kola idishi (alyuminiy)", icon: "🥤", category: "metal", categoryName: "Metall" },
    { id: 10, name: "Sharbat shishasi", icon: "🍾", category: "glass", categoryName: "Shisha" },
    { id: 11, name: "Shampun idishi", icon: "🧴", category: "plastic", categoryName: "Plastik" },
    { id: 12, name: "Eski telefon batareyasi", icon: "📱", category: "batteries", categoryName: "Batareyalar" }
  ],

  // 6. 20 Practical Eco Tips
  tips: [
    {
      id: 1,
      category: "Uyda",
      title: "Qayta ishlatiladigan suv idishi (butulka)",
      icon: "🍶",
      desc: "Har safar tashqariga chiqqanda o'zingiz bilan qayta ishlatiladigan termos yoki butilka oling. Bu yiliga yuzlab bir martalik plastik butilkalarning tejalishini ta'minlaydi."
    },
    {
      id: 2,
      category: "Uyda",
      title: "Keraksiz xonalarda chiroqlarni o'chiring",
      icon: "💡",
      desc: "Xonadan chiqayotganda chiroqni o'chirishni odat qiling. Bu elektr sarfini 15% gacha qisqartiradi."
    },
    {
      id: 3,
      category: "Uyda",
      title: "Tish yuvayotganda kranni yoping",
      icon: "🚰",
      desc: "Kuniga 2 marta 2 daqiqadan kranni yopish har bir inson uchun yiliga 8000 litrdan ortiq ichimlik suvini saqlab qoladi."
    },
    {
      id: 4,
      category: "Xaridda",
      title: "Mato xarid xaltasi (Shopper)",
      icon: "🛍️",
      desc: "Bozor va supermarketlarga o'z mato xaltangiz bilan boring. Bir martalik polietilen paketlardan voz keching."
    },
    {
      id: 5,
      category: "Uyda",
      title: "Qurilmalarni rozetkadan uzing",
      icon: "🔌",
      desc: "Kutish (standby) rejimida turgan televizor, zaryadlovchi va mikroto'lqinli pechlar elektr energiyasining 5-10 foizini yashirin iste'mol qiladi."
    },
    {
      id: 6,
      category: "Xaridda",
      title: "Mahalliy va mavsumiy mahsulotlar",
      icon: "🥬",
      desc: "Mahalliy fermerlar yetishtirgan meva-sabzavotlarni xarid qiling. Uzoq mamlakatlardan tashib keltiriladigan oziq-ovqatlarda transport chiqindilari ko'p bo'ladi."
    },
    {
      id: 7,
      category: "Ishxonada",
      title: "Qog'ozni tejash va raqamlashtirish",
      icon: "📄",
      desc: "Hujjatlarni chop etish o'rniga raqamli fayllardan foydalaning. Agar chop etish zarur bo'lsa, qog'ozning ikki tomoniga ham chiqaring."
    },
    {
      id: 8,
      category: "Tabiatda",
      title: "Har yili kamida 2 ta ko'chat eking",
      icon: "🌳",
      desc: "Bahor yoki kuz faslida hovlingizga, mahalla yoki umumiy xiyobonlarga yangi mevali yoki manzarali daraxt eking."
    },
    {
      id: 9,
      category: "Uyda",
      title: "Dush vaqtini 5 daqiqagacha qisqartiring",
      icon: "🚿",
      desc: "Vannada cho'milish o'rniga qisqa dush qabul qiling. Bu suv va uni isitish uchun sarflanadigan gaz yoki elektrni 3 barobarga kamaytiradi."
    },
    {
      id: 10,
      category: "Yo'lda",
      title: "Velosiped yoki jamoat transporti",
      icon: "🚲",
      desc: "Qisqa masofalarga mashina o'rniga piyoda yoki velosipedda boring. Bu ham salomatlik, ham toza shahar havosi uchun bebaho foydadir."
    },
    {
      id: 11,
      category: "Uyda",
      title: "Chiqindilarni saralash",
      icon: "♻️",
      desc: "Oshxonangizda qog'oz, plastik va organik chiqindilar uchun alohida qutilar tashkil qiling."
    },
    {
      id: 12,
      category: "Uyda",
      title: "Kir yuvish mashinasini to'liq yuklang",
      icon: "🧺",
      desc: "Mashinani yarim bo'sh holatda ishlatmang. Qolaversa, 30°C haroratda yuvish elektrni 40% tejaydi."
    },
    {
      id: 13,
      category: "Xaridda",
      title: "Bir martalik idishlardan voz keching",
      icon: "☕",
      desc: "Qahvaxonada o'z kubogingizni (KeepCup) so'rang. Bir martalik qog'oz stakanlar ichida yupqa plastik qatlami bo'lgani sababli qayta ishlanmaydi."
    },
    {
      id: 14,
      category: "Uyda",
      title: "Muzlatgichni to'g'ri sozlang",
      icon: "❄️",
      desc: "Muzlatgich haroratini +3...+5°C ga, muzlatkich kamerasini esa -18°C ga o'rnating. Ortiqcha sovuq oziq-ovqat sifatini oshirmaydi, lekin ko'p energiya eydi."
    },
    {
      id: 15,
      category: "Uyda",
      title: "Kompost hosil qiling",
      icon: "🌱",
      desc: "Hovlingiz bo'lsa, quruq barglar va sabzavot po'stloqlaridan kompost qiling. Bu tuproqni boyitadi va kimyoviy o'g'itlarga ehtiyoj qoldirmaydi."
    },
    {
      id: 16,
      category: "Texnika",
      title: "Energosamarador A+++ texnikalar",
      icon: "⚡",
      desc: "Yangi maishiy texnika olayotganda har doim energiya samaradorligi sinfiga e'tibor bering (A++ yoki A+++)."
    },
    {
      id: 17,
      category: "Tabiatda",
      title: "Tabiat qo'ynida dam olganda axlat qoldirmang",
      icon: "🏕️",
      desc: "Tog' yoki daryo bo'yida dam olgach, barcha qoldiqlarni o'zingiz bilan qaytarib olib keting va atrofni kelganingizdan ham tozarroq qoldiring."
    },
    {
      id: 18,
      category: "Uyda",
      title: "Tomayotgan kranlarni tuzating",
      icon: "🔧",
      desc: "Sekin tomib turgan birgina kran oyiga 300 dan 1000 litrgacha suvni behuda oqizib yuboradi."
    },
    {
      id: 19,
      category: "Xaridda",
      title: "Kiyimlarni oqilona tanlang",
      icon: "👕",
      desc: "Tezkor moda (fast fashion) tabiatning eng katta ifloslantiruvchilaridan biridir. Sifatli va uzoq xizmat qiladigan kiyimlarga sarmoya kiriting."
    },
    {
      id: 20,
      category: "Ishxonada",
      title: "Keraksiz elektron xatlarni tozalang",
      icon: "📧",
      desc: "Data-markazlar ulkan elektr sarflaydi. Keraksiz minglab spam xatlarni o'chirish serverlar yuklamasini kamaytiradi."
    }
  ],

  // 7. Daily Eco Challenges
  challenges: [
    "Bugun bir martalik plastik paket yoki butilkadan umuman foydalanmang.",
    "Bugun tish tozalash va yuvinish davomida suvni faqat zarur soniyalarda oching.",
    "Bugun xonadan chiqayotganda barcha chiroqlar va ortiqcha zaryadlagichlarni o'chiring.",
    "Bugun qisqa masofaga transport o'rniga piyoda yoki velosipedda harakatlaning.",
    "Bugun kofe yoki choyni bir martalik qog'oz stakanda emas, o'z keramik finjoningizda iching.",
    "Bugun tushlik uchun mahalliy sabzavotlardan tayyorlangan yashil taom tanlang.",
    "Bugun barcha organik yoki qog'oz chiqindilarni alohida ajratib qo'ying.",
    "Bugun kompyuter yoki telefoningizdagi eski keraksiz fayllar va spam xatlarni tozalang."
  ]
};
