// Bible structure and sample data
// In production, this would be loaded from compressed JSON/IndexedDB

export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  number: number;
  verses: Verse[];
}

export interface Book {
  id: string;
  name: string;
  shortName: string;
  testament: 'OT' | 'NT';
  chapters: Chapter[];
}

export interface BibleData {
  books: Book[];
}

// Complete Bible structure with books
export const BIBLE_BOOKS: Omit<Book, 'chapters'>[] = [
  // Old Testament
  { id: 'gen', name: 'Genesis', shortName: 'Gen', testament: 'OT' },
  { id: 'exo', name: 'Exodus', shortName: 'Exo', testament: 'OT' },
  { id: 'lev', name: 'Leviticus', shortName: 'Lev', testament: 'OT' },
  { id: 'num', name: 'Numbers', shortName: 'Num', testament: 'OT' },
  { id: 'deu', name: 'Deuteronomy', shortName: 'Deu', testament: 'OT' },
  { id: 'jos', name: 'Joshua', shortName: 'Jos', testament: 'OT' },
  { id: 'jdg', name: 'Judges', shortName: 'Jdg', testament: 'OT' },
  { id: 'rut', name: 'Ruth', shortName: 'Rut', testament: 'OT' },
  { id: '1sa', name: '1 Samuel', shortName: '1Sa', testament: 'OT' },
  { id: '2sa', name: '2 Samuel', shortName: '2Sa', testament: 'OT' },
  { id: '1ki', name: '1 Kings', shortName: '1Ki', testament: 'OT' },
  { id: '2ki', name: '2 Kings', shortName: '2Ki', testament: 'OT' },
  { id: '1ch', name: '1 Chronicles', shortName: '1Ch', testament: 'OT' },
  { id: '2ch', name: '2 Chronicles', shortName: '2Ch', testament: 'OT' },
  { id: 'ezr', name: 'Ezra', shortName: 'Ezr', testament: 'OT' },
  { id: 'neh', name: 'Nehemiah', shortName: 'Neh', testament: 'OT' },
  { id: 'est', name: 'Esther', shortName: 'Est', testament: 'OT' },
  { id: 'job', name: 'Job', shortName: 'Job', testament: 'OT' },
  { id: 'psa', name: 'Psalms', shortName: 'Psa', testament: 'OT' },
  { id: 'pro', name: 'Proverbs', shortName: 'Pro', testament: 'OT' },
  { id: 'ecc', name: 'Ecclesiastes', shortName: 'Ecc', testament: 'OT' },
  { id: 'sng', name: 'Song of Solomon', shortName: 'Sng', testament: 'OT' },
  { id: 'isa', name: 'Isaiah', shortName: 'Isa', testament: 'OT' },
  { id: 'jer', name: 'Jeremiah', shortName: 'Jer', testament: 'OT' },
  { id: 'lam', name: 'Lamentations', shortName: 'Lam', testament: 'OT' },
  { id: 'ezk', name: 'Ezekiel', shortName: 'Ezk', testament: 'OT' },
  { id: 'dan', name: 'Daniel', shortName: 'Dan', testament: 'OT' },
  { id: 'hos', name: 'Hosea', shortName: 'Hos', testament: 'OT' },
  { id: 'jol', name: 'Joel', shortName: 'Jol', testament: 'OT' },
  { id: 'amo', name: 'Amos', shortName: 'Amo', testament: 'OT' },
  { id: 'oba', name: 'Obadiah', shortName: 'Oba', testament: 'OT' },
  { id: 'jon', name: 'Jonah', shortName: 'Jon', testament: 'OT' },
  { id: 'mic', name: 'Micah', shortName: 'Mic', testament: 'OT' },
  { id: 'nam', name: 'Nahum', shortName: 'Nam', testament: 'OT' },
  { id: 'hab', name: 'Habakkuk', shortName: 'Hab', testament: 'OT' },
  { id: 'zep', name: 'Zephaniah', shortName: 'Zep', testament: 'OT' },
  { id: 'hag', name: 'Haggai', shortName: 'Hag', testament: 'OT' },
  { id: 'zec', name: 'Zechariah', shortName: 'Zec', testament: 'OT' },
  { id: 'mal', name: 'Malachi', shortName: 'Mal', testament: 'OT' },
  // New Testament
  { id: 'mat', name: 'Matthew', shortName: 'Mat', testament: 'NT' },
  { id: 'mrk', name: 'Mark', shortName: 'Mrk', testament: 'NT' },
  { id: 'luk', name: 'Luke', shortName: 'Luk', testament: 'NT' },
  { id: 'jhn', name: 'John', shortName: 'Jhn', testament: 'NT' },
  { id: 'act', name: 'Acts', shortName: 'Act', testament: 'NT' },
  { id: 'rom', name: 'Romans', shortName: 'Rom', testament: 'NT' },
  { id: '1co', name: '1 Corinthians', shortName: '1Co', testament: 'NT' },
  { id: '2co', name: '2 Corinthians', shortName: '2Co', testament: 'NT' },
  { id: 'gal', name: 'Galatians', shortName: 'Gal', testament: 'NT' },
  { id: 'eph', name: 'Ephesians', shortName: 'Eph', testament: 'NT' },
  { id: 'php', name: 'Philippians', shortName: 'Php', testament: 'NT' },
  { id: 'col', name: 'Colossians', shortName: 'Col', testament: 'NT' },
  { id: '1th', name: '1 Thessalonians', shortName: '1Th', testament: 'NT' },
  { id: '2th', name: '2 Thessalonians', shortName: '2Th', testament: 'NT' },
  { id: '1ti', name: '1 Timothy', shortName: '1Ti', testament: 'NT' },
  { id: '2ti', name: '2 Timothy', shortName: '2Ti', testament: 'NT' },
  { id: 'tit', name: 'Titus', shortName: 'Tit', testament: 'NT' },
  { id: 'phm', name: 'Philemon', shortName: 'Phm', testament: 'NT' },
  { id: 'heb', name: 'Hebrews', shortName: 'Heb', testament: 'NT' },
  { id: 'jas', name: 'James', shortName: 'Jas', testament: 'NT' },
  { id: '1pe', name: '1 Peter', shortName: '1Pe', testament: 'NT' },
  { id: '2pe', name: '2 Peter', shortName: '2Pe', testament: 'NT' },
  { id: '1jn', name: '1 John', shortName: '1Jn', testament: 'NT' },
  { id: '2jn', name: '2 John', shortName: '2Jn', testament: 'NT' },
  { id: '3jn', name: '3 John', shortName: '3Jn', testament: 'NT' },
  { id: 'jud', name: 'Jude', shortName: 'Jud', testament: 'NT' },
  { id: 'rev', name: 'Revelation', shortName: 'Rev', testament: 'NT' },
];

// Sample Bible data (KJV excerpts for demo)
// In production, full Bible text would be loaded from IndexedDB
export const SAMPLE_BIBLE_DATA: Record<string, Chapter[]> = {
  gen: [
    {
      number: 1,
      verses: [
        { number: 1, text: "In the beginning God created the heaven and the earth." },
        { number: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
        { number: 3, text: "And God said, Let there be light: and there was light." },
        { number: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
        { number: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
        { number: 6, text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters." },
        { number: 7, text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so." },
        { number: 8, text: "And God called the firmament Heaven. And the evening and the morning were the second day." },
        { number: 9, text: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so." },
        { number: 10, text: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good." },
        { number: 11, text: "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so." },
        { number: 12, text: "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good." },
        { number: 13, text: "And the evening and the morning were the third day." },
        { number: 14, text: "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years." },
        { number: 15, text: "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so." },
        { number: 16, text: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also." },
        { number: 17, text: "And God set them in the firmament of the heaven to give light upon the earth." },
        { number: 18, text: "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good." },
        { number: 19, text: "And the evening and the morning were the fourth day." },
        { number: 20, text: "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven." },
        { number: 21, text: "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good." },
        { number: 22, text: "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth." },
        { number: 23, text: "And the evening and the morning were the fifth day." },
        { number: 24, text: "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so." },
        { number: 25, text: "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good." },
        { number: 26, text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth." },
        { number: 27, text: "So God created man in his own image, in the image of God created he him; male and female created he them." },
        { number: 28, text: "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth." },
        { number: 29, text: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat." },
        { number: 30, text: "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so." },
        { number: 31, text: "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day." },
      ],
    },
    {
      number: 2,
      verses: [
        { number: 1, text: "Thus the heavens and the earth were finished, and all the host of them." },
        { number: 2, text: "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made." },
        { number: 3, text: "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made." },
        { number: 4, text: "These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens." },
        { number: 5, text: "And every plant of the field before it was in the earth, and every herb of the field before it grew: for the LORD God had not caused it to rain upon the earth, and there was not a man to till the ground." },
        { number: 6, text: "But there went up a mist from the earth, and watered the whole face of the ground." },
        { number: 7, text: "And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul." },
      ],
    },
    {
      number: 3,
      verses: [
        { number: 1, text: "Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?" },
        { number: 2, text: "And the woman said unto the serpent, We may eat of the fruit of the trees of the garden:" },
        { number: 3, text: "But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die." },
        { number: 4, text: "And the serpent said unto the woman, Ye shall not surely die:" },
        { number: 5, text: "For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil." },
      ],
    },
  ],
  jhn: [
    {
      number: 1,
      verses: [
        { number: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
        { number: 2, text: "The same was in the beginning with God." },
        { number: 3, text: "All things were made by him; and without him was not any thing made that was made." },
        { number: 4, text: "In him was life; and the life was the light of men." },
        { number: 5, text: "And the light shineth in darkness; and the darkness comprehended it not." },
        { number: 6, text: "There was a man sent from God, whose name was John." },
        { number: 7, text: "The same came for a witness, to bear witness of the Light, that all men through him might believe." },
        { number: 8, text: "He was not that Light, but was sent to bear witness of that Light." },
        { number: 9, text: "That was the true Light, which lighteth every man that cometh into the world." },
        { number: 10, text: "He was in the world, and the world was made by him, and the world knew him not." },
        { number: 11, text: "He came unto his own, and his own received him not." },
        { number: 12, text: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:" },
        { number: 13, text: "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God." },
        { number: 14, text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth." },
      ],
    },
    {
      number: 3,
      verses: [
        { number: 1, text: "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:" },
        { number: 2, text: "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him." },
        { number: 3, text: "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God." },
        { number: 14, text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:" },
        { number: 15, text: "That whosoever believeth in him should not perish, but have eternal life." },
        { number: 16, text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
        { number: 17, text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." },
      ],
    },
  ],
  psa: [
    {
      number: 23,
      verses: [
        { number: 1, text: "The LORD is my shepherd; I shall not want." },
        { number: 2, text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
        { number: 3, text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
        { number: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
        { number: 5, text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over." },
        { number: 6, text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." },
      ],
    },
    {
      number: 91,
      verses: [
        { number: 1, text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty." },
        { number: 2, text: "I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust." },
        { number: 3, text: "Surely he shall deliver thee from the snare of the fowler, and from the noisome pestilence." },
        { number: 4, text: "He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler." },
        { number: 5, text: "Thou shalt not be afraid for the terror by night; nor for the arrow that flieth by day;" },
        { number: 6, text: "Nor for the pestilence that walketh in darkness; nor for the destruction that wasteth at noonday." },
      ],
    },
    {
      number: 1,
      verses: [
        { number: 1, text: "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful." },
        { number: 2, text: "But his delight is in the law of the LORD; and in his law doth he meditate day and night." },
        { number: 3, text: "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper." },
        { number: 4, text: "The ungodly are not so: but are like the chaff which the wind driveth away." },
        { number: 5, text: "Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous." },
        { number: 6, text: "For the LORD knoweth the way of the righteous: but the way of the ungodly shall perish." },
      ],
    },
  ],
  pro: [
    {
      number: 3,
      verses: [
        { number: 5, text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding." },
        { number: 6, text: "In all thy ways acknowledge him, and he shall direct thy paths." },
      ],
    },
  ],
  mat: [
    {
      number: 5,
      verses: [
        { number: 1, text: "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:" },
        { number: 2, text: "And he opened his mouth, and taught them, saying," },
        { number: 3, text: "Blessed are the poor in spirit: for theirs is the kingdom of heaven." },
        { number: 4, text: "Blessed are they that mourn: for they shall be comforted." },
        { number: 5, text: "Blessed are the meek: for they shall inherit the earth." },
        { number: 6, text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled." },
        { number: 7, text: "Blessed are the merciful: for they shall obtain mercy." },
        { number: 8, text: "Blessed are the pure in heart: for they shall see God." },
        { number: 9, text: "Blessed are the peacemakers: for they shall be called the children of God." },
        { number: 10, text: "Blessed are they which are persecuted for righteousness' sake: for theirs is the kingdom of heaven." },
        { number: 11, text: "Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake." },
        { number: 12, text: "Rejoice, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you." },
      ],
    },
    {
      number: 6,
      verses: [
        { number: 9, text: "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name." },
        { number: 10, text: "Thy kingdom come. Thy will be done in earth, as it is in heaven." },
        { number: 11, text: "Give us this day our daily bread." },
        { number: 12, text: "And forgive us our debts, as we forgive our debtors." },
        { number: 13, text: "And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen." },
      ],
    },
  ],
  rom: [
    {
      number: 8,
      verses: [
        { number: 28, text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
        { number: 31, text: "What shall we then say to these things? If God be for us, who can be against us?" },
        { number: 37, text: "Nay, in all these things we are more than conquerors through him that loved us." },
        { number: 38, text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come," },
        { number: 39, text: "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord." },
      ],
    },
  ],
  php: [
    {
      number: 4,
      verses: [
        { number: 6, text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." },
        { number: 7, text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
        { number: 13, text: "I can do all things through Christ which strengtheneth me." },
      ],
    },
  ],
  rev: [
    {
      number: 21,
      verses: [
        { number: 1, text: "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea." },
        { number: 2, text: "And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband." },
        { number: 3, text: "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God." },
        { number: 4, text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." },
        { number: 5, text: "And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful." },
      ],
    },
  ],
};

// Chapter count for each book
export const CHAPTER_COUNTS: Record<string, number> = {
  gen: 50, exo: 40, lev: 27, num: 36, deu: 34, jos: 24, jdg: 21, rut: 4,
  '1sa': 31, '2sa': 24, '1ki': 22, '2ki': 25, '1ch': 29, '2ch': 36, ezr: 10,
  neh: 13, est: 10, job: 42, psa: 150, pro: 31, ecc: 12, sng: 8, isa: 66,
  jer: 52, lam: 5, ezk: 48, dan: 12, hos: 14, jol: 3, amo: 9, oba: 1,
  jon: 4, mic: 7, nam: 3, hab: 3, zep: 3, hag: 2, zec: 14, mal: 4,
  mat: 28, mrk: 16, luk: 24, jhn: 21, act: 28, rom: 16, '1co': 16, '2co': 13,
  gal: 6, eph: 6, php: 4, col: 4, '1th': 5, '2th': 3, '1ti': 6, '2ti': 4,
  tit: 3, phm: 1, heb: 13, jas: 5, '1pe': 5, '2pe': 3, '1jn': 5, '2jn': 1,
  '3jn': 1, jud: 1, rev: 22,
};

export function getBook(bookId: string): Omit<Book, 'chapters'> | undefined {
  return BIBLE_BOOKS.find(b => b.id === bookId);
}

export function getChapter(bookId: string, chapterNumber: number): Chapter | undefined {
  const chapters = SAMPLE_BIBLE_DATA[bookId];
  if (!chapters) return undefined;
  return chapters.find(c => c.number === chapterNumber);
}

export function getChapterCount(bookId: string): number {
  return CHAPTER_COUNTS[bookId] || 0;
}
