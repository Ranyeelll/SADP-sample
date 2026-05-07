export interface BookPage {
  chapter: string;
  pageNumber: number;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
}

export interface Section {
  id: string;
  title: string;
  dates: string;
  pages: BookPage[];
}

export const sections: Section[] = [
  {
    id: 'parish-beginnings',
    title: 'Parish Beginnings',
    dates: '2011 — 2012',
    pages: [
      {
        chapter: 'Chapter I — The Parish is Erected',
        pageNumber: 1,
        image: '/founding-of-parish.jpg',
        imageAlt: 'The original chapel of San Antonio de Padua Parish',
        paragraphs: [
          'The story of San Antonio de Padua Parish begins in Batasan Hills, where families longed for a spiritual home that would be near enough for prayer, the sacraments, and the formation of their children in the faith.',
          'By Decree 2011-276, the Diocese of Novaliches formally erected San Antonio de Padua Parish on 13 June 2011 under the guidance of Most Rev. Antonio R. Tobias, DD. The beginning was simple, but it was also clear and hopeful.',
          'From the first Mass in a modest chapel, the parish became a place where neighbors gathered to hear the Word of God, receive the sacraments, and begin a shared life as one community.'
        ]
      },
      {
        chapter: 'Chapter I — The Parish is Erected',
        pageNumber: 2,
        paragraphs: [
          'The first years were marked by prayer, gratitude, and steady work. The parish priest and the lay leaders who stood with him established the rhythms of parish life: weekday Mass, the novena to San Antonio, catechism for the young, and quiet acts of service for families in need.',
          'The chapel quickly became familiar ground for baptisms, weddings, funerals, and the ordinary joys of parish life. Each liturgy and gathering taught the people that a parish is built not only of walls and roofs, but of memory, faith, and shared service.',
          'Those early years formed the foundation of a story that continues today — a parish rooted in devotion to San Antonio de Padua, and in the steady labor of a community learning to pray together, serve together, and hope together.'
        ]
      }
    ]
  },
  {
    id: 'parish-life',
    title: 'Parish Life',
    dates: '2013 — 2015',
    pages: [
      {
        chapter: 'Chapter II — Building the Community',
        pageNumber: 3,
        image: '/growth-of-community.jpg',
        imageAlt: 'Parishioners gathering for parish life and service',
        paragraphs: [
          'As the parish grew, so did its ministries. More families joined the Sunday liturgies, children gathered for catechism, and volunteers began to shape the life of the parish through music, service, and prayer.',
          'The community learned to organize itself around the needs of the faithful: ushers, choir members, catechists, readers, collectors, and ordinary parishioners who simply came early and stayed late because they loved the house of God.',
          'What had begun as a small chapel life slowly became a visible parish family, one that welcomed neighbors from every corner of Batasan Hills and gave them a place to belong.'
        ]
      },
      {
        chapter: 'Chapter II — Building the Community',
        pageNumber: 4,
        paragraphs: [
          'The parish also began to discover its wider mission. Formation sessions, devotional groups, and regular parish gatherings helped the faithful grow in knowledge of the Church and in love for one another.',
          'The parish priest encouraged a spirit of service that reached beyond Sunday worship. Parishioners learned to see ministry as a shared responsibility, whether in the choir loft, the catechism room, the altar, or the community outreach desk.',
          'These years gave the parish a strong center: prayer at the heart, service at the edges, and a community formed by the grace of God.'
        ]
      }
    ]
  },
  {
    id: 'parish-service',
    title: 'Bread and Service',
    dates: '2016 — 2018',
    pages: [
      {
        chapter: 'Chapter III — Bread, Service, and Formation',
        pageNumber: 5,
        image: '/tinapay-project.jpg',
        imageAlt: 'Tinapay de San Antonio parish livelihood project',
        paragraphs: [
          'As the parish matured, it also learned that faith must feed the body as well as the soul. From that conviction came parish projects such as Tinapay de San Antonio, a livelihood initiative that carried with it the simple beauty of shared work and shared bread.',
          'The project became a sign that the parish did not exist only for Sunday worship. It also stood with families in practical ways, creating opportunities for service, cooperation, and dignity in everyday life.',
          'At the same time, the parish continued its work in formation: Bible studies, youth gatherings, devotional groups, and ministries that taught people how to serve with joy, discipline, and charity.'
        ]
      },
      {
        chapter: 'Chapter III — Bread, Service, and Formation',
        pageNumber: 6,
        paragraphs: [
          'The parish priest and the people worked side by side to make the parish warm, ordered, and welcoming. New members found catechists ready to help, ministries ready to serve, and a church family ready to receive them.',
          'Over the years, the parish deepened its pastoral care through gatherings for the youth, outreach to families, and the patient ministry of listening that is often invisible but always essential.',
          'These years of service gave the parish a stable identity: prayer at the center, service at the edges, and a community bound together not by convenience but by faith.'
        ]
      }
    ]
  },
  {
    id: 'parish-present',
    title: 'The Parish Today',
    dates: '2019 — Present',
    pages: [
      {
        chapter: 'Chapter IV — A Living Parish',
        pageNumber: 7,
        image: '/San_Antonio_de_Padua_Parish_-_Batasan_Hills,_Quezon_City.jpg',
        imageAlt: 'San Antonio de Padua Parish church facade in Batasan Hills, Quezon City',
        paragraphs: [
          'Today the parish stands as a living home for worship and mission in Batasan Hills. Its doors open for the daily and Sunday liturgies, for the quiet hours of prayer, and for the celebrations that mark the life of the faithful.',
          'The parish continues to grow through sacraments, devotions, outreach, and community life. Families come for baptism, first communion, confirmation, marriage preparation, and the many moments when the Church accompanies people in ordinary and extraordinary times.',
          'What began in 2011 by decree has become a lasting parish story — not simply a record of dates, but a witness that God builds His people through prayer, leadership, and the faith of those who keep showing up.'
        ]
      },
      {
        chapter: 'Chapter IV — A Living Parish',
        pageNumber: 8,
        paragraphs: [
          'The parish also gives witness through its parish priest, lay ministers, and volunteers who care for the spiritual and practical needs of the community. Their service keeps the parish close to the people it serves.',
          'In moments of celebration and in times of difficulty, the parish remains a place of gathering. It is where the people of God come to be nourished, sent forth, and reminded that faith is something lived together.',
          'The story of San Antonio de Padua Parish continues to unfold, but its foundation is clear: a parish formally erected in 2011 by the Diocese of Novaliches, entrusted to the patronage of San Antonio de Padua, and carried forward by a community that keeps building on that beginning.'
        ]
      }
    ]
  }
];

export const allPages: (BookPage & {
  sectionId: string;
  sectionTitle: string;
})[] = sections.flatMap((section) =>
  section.pages.map((page) => ({
    ...page,
    sectionId: section.id,
    sectionTitle: section.title
  }))
);
