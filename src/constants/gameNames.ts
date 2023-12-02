export const DefaultGameName = [
  'London',
  'New York',
  'Moscow',
  'Paris',
  'Rome',
  'Madrid',
  'Kiev',
  'Tokyo',
  'Beijing',
  'Delhi',
  'Istanbul',
  'Caracas',
  'Buenos Aires',
  'Ottawa',
  'Manila',
  'Nairobi',
  'Jakarta',
  'Dhaka',
  'Rio de Janeiro',
  'Santiago',
]

export function getRandomGameName() {
  return DefaultGameName[Math.floor(Math.random() * DefaultGameName.length)]
}
