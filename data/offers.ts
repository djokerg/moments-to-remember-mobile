export type Offer = {
  id: string;
  key: string;
  title: string;
  description: string;
  image: any;
  price: number;
};

export const offers: Offer[] = [
  {
    id: 'wedding',
    key: 'wedding',
    title: 'Venčanje',
    description:
      'Savršeno planirana venčanja sa stilom – svaki trenutak je pažljivo osmišljen.',
    image: require('../assets/wedding.jpg'),
    price: 45000,
  },
  {
    id: 'birthday',
    key: 'birthday',
    title: 'Rođendan',
    description:
      'Rođendanske proslave prepune radosti, zabave i nezaboravnih iznenađenja.',
    image: require('../assets/birthday.jpg'),
    price: 20000,
  },
  {
    id: 'military',
    key: 'military',
    title: 'Vojničko slavlje',
    description:
      'Specijalne proslave u čast služenja i odbrane – dostojanstveno i svečano.',
    image: require('../assets/military.jpg'),
    price: 30000,
  },
  {
    id: 'graduation',
    key: 'graduation',
    title: 'Matura',
    description:
      'Proslava velikog koraka – stilizovana atmosfera i odlična zabava.',
    image: require('../assets/graduation.jpg'),
    price: 25000,
  },
  {
    id: 'girlsparty',
    key: 'girlsparty',
    title: 'Devojačko veče',
    description: 'Sa stilom i osmehom – veče koje se pamti.',
    image: require('../assets/girlsparty.jpg'),
    price: 18000,
  },
  {
    id: 'businesslunch',
    key: 'businesslunch',
    title: 'Biznis ručak',
    description:
      'Elegantna i profesionalna atmosfera za vaše poslovne susrete.',
    image: require('../assets/businesslunch.jpg'),
    price: 35000,
  },
];
