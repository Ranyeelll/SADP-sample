export interface BookPage {
  chapter: string;
  pageNumber: number;
  paragraphs: string[];
}

export interface Section {
  id: string;
  title: string;
  dates: string;
  pages: BookPage[];
}

export const sections: Section[] = [
{
  id: 'early-church',
  title: 'Early Church',
  dates: '33 — 500 AD',
  pages: [
  {
    chapter: 'Chapter I — The Apostolic Age',
    pageNumber: 1,
    paragraphs: [
    'In the years following the resurrection, a small gathering of disciples in Jerusalem would set into motion a movement destined to spread across the Roman world. The Book of Acts records the descent of the Holy Spirit at Pentecost, marking the formal beginning of the Christian community. From this modest beginning, the apostles dispersed across the Mediterranean basin, preaching the Gospel in synagogues, marketplaces, and the homes of converts.',
    'Saint Paul, once a persecutor of the faithful, became its most ardent missionary. His epistles to the churches of Corinth, Rome, Galatia, and Ephesus formed the doctrinal bedrock upon which Christian theology would rest for centuries. By the close of the first century, communities of believers could be found from Antioch to Alexandria, from Rome to the distant shores of Britannia.',
    'Yet the early Church did not grow without cost. Its adherents lived under the suspicion of a pagan empire, often misunderstood and frequently maligned. Worship was conducted in private homes, and the breaking of bread became both sacrament and symbol of unity.']

  },
  {
    chapter: 'Chapter I — The Apostolic Age',
    pageNumber: 2,
    paragraphs: [
    'The age of persecution tested the resolve of the faithful. Under emperors such as Nero, Domitian, and later Diocletian, Christians were imprisoned, exiled, and martyred. The blood of the martyrs, as Tertullian famously wrote, became the seed of the Church. Saints Peter and Paul were among those who gave their lives in Rome, the eternal city that would in time become the center of Christendom.',
    'Despite — or perhaps because of — these trials, the faith spread with remarkable swiftness. Catacombs beneath Rome bore witness to clandestine liturgies; the fish, the anchor, and the chi-rho became silent symbols of belonging. By the third century, Christianity had become a force the empire could neither ignore nor suppress.',
    'The turning point arrived in the year 313, when Emperor Constantine, having seen a vision of the cross before the Battle of the Milvian Bridge, issued the Edict of Milan. With a stroke of imperial decree, the long age of persecution drew to a close, and the Church emerged from the shadows into the light of public life.']

  },
  {
    chapter: 'Chapter II — Councils and Creeds',
    pageNumber: 3,
    paragraphs: [
    'With the legalization of Christianity came new challenges. Doctrinal disputes, once settled in the small circles of bishops, now demanded resolution on a universal scale. In 325, Constantine convened the First Council of Nicaea, gathering bishops from across the empire to address the Arian controversy and to articulate the divinity of Christ.',
    "From this council emerged the Nicene Creed, a profession of faith that would unite Christians across language and culture. Subsequent councils — Constantinople, Ephesus, Chalcedon — refined the Church's understanding of the Trinity and the Incarnation, shaping orthodoxy as it would be received for the next thousand years.",
    'The age also gave rise to the great Fathers of the Church: Athanasius, defender of Nicene faith; Augustine of Hippo, whose Confessions and City of God still illuminate the Christian mind; and Jerome, whose Latin Vulgate would become the standard Scripture of the Western world.']

  }]

},
{
  id: 'middle-ages',
  title: 'Middle Ages',
  dates: '500 — 1450 AD',
  pages: [
  {
    chapter: 'Chapter III — Monasticism and Mission',
    pageNumber: 4,
    paragraphs: [
    'As the Western Empire crumbled beneath waves of migration, the Church alone preserved the threads of civilization. In the silence of the cloister, monks copied manuscripts by candlelight, safeguarding the wisdom of the ancients alongside the words of Scripture. Saint Benedict of Nursia, in his Rule, gave shape to a way of life that balanced prayer, labor, and learning.',
    'From these monasteries flowed missionaries who carried the faith to the peoples of northern Europe. Saint Patrick brought Christianity to Ireland; Saint Augustine of Canterbury established it among the Anglo-Saxons; Saints Cyril and Methodius gave the Slavs both faith and a written language. The face of Europe was being remade.',
    'Charlemagne, crowned by Pope Leo III on Christmas Day of the year 800, embodied the union of throne and altar that would define the medieval imagination. The Carolingian renaissance brought a renewal of letters, and the cathedral schools of his realm planted the seeds of the universities to come.']

  },
  {
    chapter: 'Chapter IV — Schism and Scholasticism',
    pageNumber: 5,
    paragraphs: [
    'The year 1054 brought a sorrow that has never fully healed. The mutual excommunications between the Patriarch of Constantinople and the legates of Rome formalized a rupture between East and West, sundering the Christian world into Catholic and Orthodox communions. Disputes over the filioque, papal authority, and liturgical practice had long simmered; now they hardened into separation.',
    'Yet the Western Church entered an age of remarkable intellectual flowering. The twelfth and thirteenth centuries gave rise to the universities of Bologna, Paris, and Oxford. In their halls, scholars such as Anselm, Bonaventure, and Thomas Aquinas wove together the philosophy of Aristotle and the revelation of Scripture into the great synthesis of scholasticism.',
    'The same age witnessed the rise of the mendicant orders. Saint Francis of Assisi embraced lady poverty and called the Church back to the simplicity of the Gospel; Saint Dominic answered heresy with preaching and learning. Together their friars walked the dusty roads of Christendom, beggars and scholars alike.']

  }]

},
{
  id: 'reformation',
  title: 'Reformation',
  dates: '1450 — 1650 AD',
  pages: [
  {
    chapter: 'Chapter V — Ninety-Five Theses',
    pageNumber: 6,
    paragraphs: [
    'On the eve of All Saints in the year 1517, an Augustinian friar named Martin Luther affixed a list of theses to the door of the castle church in Wittenberg. He had intended only to invite scholarly disputation over the sale of indulgences. He could not have foreseen that his words, carried swiftly upon the wings of the printing press, would shake the foundations of Western Christendom.',
    "What began as a call for reform soon became a rupture. Luther's doctrines of sola scriptura and sola fide drew followers across the German lands; in Geneva, John Calvin built a city upon his vision of divine sovereignty; in England, Henry VIII severed the realm from Rome and placed the crown at the head of a new ecclesial settlement.",
    'The unity of medieval Christendom, already strained, gave way. Wars of religion would scar the continent for more than a century, and the map of Europe would never again be what it had been before that autumn night in Wittenberg.']

  },
  {
    chapter: 'Chapter VI — Trent and Renewal',
    pageNumber: 7,
    paragraphs: [
    'The Catholic Church did not stand idle. Convened from 1545 to 1563, the Council of Trent met in three long sessions to address the crises of the age. Its decrees clarified Catholic teaching on Scripture and tradition, justification, the sacraments, and the Mass. It reformed the formation of clergy, established seminaries, and gave the Roman Rite the form it would carry into the twentieth century.',
    'A spirit of renewal swept the Catholic world. Saint Ignatius of Loyola founded the Society of Jesus, whose members became teachers, missionaries, and confessors to kings. Saint Teresa of Ávila and Saint John of the Cross reformed the Carmelites and gave the Church mystical writings of unsurpassed depth. Saint Charles Borromeo embodied the model of the post-Tridentine bishop.',
    'Beyond Europe, missionaries crossed oceans. Saint Francis Xavier carried the Gospel to India and Japan; Jesuits and Franciscans laboured in the Americas and the Philippines, where parishes such as San Antonio de Padua would in time take root, weaving the faith into the very soil of new lands.']

  }]

},
{
  id: 'modern-church',
  title: 'Modern Church',
  dates: '1650 — Present',
  pages: [
  {
    chapter: 'Chapter VII — A Council for the Modern World',
    pageNumber: 8,
    paragraphs: [
    'The modern age confronted the Church with challenges unknown to her fathers. Revolutions political and industrial reshaped society; new sciences questioned old certainties; secular philosophies offered visions of humanity unmoored from the divine. Through it all, the Church sought to remain both faithful and intelligible to a changing world.',
    "On the eleventh of October, 1962, Pope Saint John XXIII opened the doors of the Second Vatican Council. He spoke of throwing open the windows of the Church to let in fresh air. Over four sessions, the council fathers produced sixteen documents that reshaped Catholic life: liturgy in the vernacular, renewed engagement with Scripture, dialogue with other Christians and other religions, and a fuller appreciation of the laity's role in the world.",
    "The reforms were neither universally welcomed nor uniformly applied, and the decades following witnessed both renewal and turbulence. Yet the council's call — to bring Christ to the modern world and the modern world to Christ — remains the horizon of Catholic life today."]

  },
  {
    chapter: 'Chapter VIII — A Pilgrim Church',
    pageNumber: 9,
    paragraphs: [
    'The papacies of Saint John Paul II, Benedict XVI, and Francis have each in their own way carried forward the conciliar vision. The fall of the Iron Curtain, the rise of the global South, the reckoning with grave failures of accountability, and the encounter with new questions of bioethics, ecology, and digital culture have all marked the contemporary Church.',
    'Today the Catholic faith is professed by more than a billion souls across every continent. In great basilicas and humble parishes alike — in San Antonio de Padua and in countless communities like her — the same liturgy is celebrated, the same creed confessed, the same bread broken in remembrance.',
    'The Church remains, as she has always been, a pilgrim people: walking through history, marked by the wounds of her members and luminous with the holiness of her saints, journeying always toward the city whose builder and maker is God.']

  }]

}];


export const allPages: (BookPage & {
  sectionId: string;
  sectionTitle: string;
})[] = sections.flatMap((s) =>
s.pages.map((p) => ({ ...p, sectionId: s.id, sectionTitle: s.title }))
);