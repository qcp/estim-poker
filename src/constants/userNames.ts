export const DefaultUserName = [
  'Mickey Mouse',
  'Donald Duck',
  'Goofy',
  'Pluto',
  'Winnie the Pooh',
  'Eeyore',
  'Rabbit',
  'Owl',
  'Piglet',
  'Tigger',
  'Simba',
  'Timon',
  'Pumba',
  'Nemo',
  'Dory',
  'Marlin',
  'Carl',
  'Remy',
  'Mushroom boy',
  'ВАЛЛ-И'
]

export function getRandomUserName() {
  return DefaultUserName[Math.floor(Math.random() * DefaultUserName.length)]
}
