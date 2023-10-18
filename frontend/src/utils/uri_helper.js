const normalise_uri = name => {
  return name
    .replaceAll(' ', '_')
    .replaceAll('?', '#3F')
    .replaceAll('#', '%23')
    .replaceAll('&', '%26')
    .replaceAll('\'', '%27')
}

export default normalise_uri