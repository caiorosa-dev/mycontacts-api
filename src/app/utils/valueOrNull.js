function valueOrNull(value) {
  return value && value !== '' ? value : null;
}

module.exports = valueOrNull;
