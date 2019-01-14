function LastStatemants(list, content) {
  this.list = list
  this.content = content
}

LastStatemants.prototype.getContent = function(lang) {
  if (lang === 'hy') {
    return this.hy()
  } else if (lang === 'ru') {
    return this.ru()
  } else if (lang === 'en') {
    return this.en()
  } else {
    return []
  }
}

LastStatemants.prototype.getRegion = function(region) {
  return this.content.regions[region];
}

LastStatemants.prototype.getCity = function(city) {
  return this.content.cities[city];
}

LastStatemants.prototype.getSubTypeLower = function(subType) {
  return this.content.subTypes[subType].toLowerCase();
}

LastStatemants.prototype.getSubType = function(subType) {
  return this.content.subTypes[subType];
}

LastStatemants.prototype.getUnit = function(unit) {
  return this.content.units[unit]
}

function LastProposalsContent(list, content) {
  LastStatemants.call(this, list, content)
}

LastProposalsContent.prototype = Object.create(LastStatemants.prototype)

LastProposalsContent.prototype.hy = function() {
  return this.list.map((p) => {
    const region = this.getRegion(p.region)
    const city = this.getCity(p.city)
    const subType = this.getSubTypeLower(p.subType)
    const price = p.price;
    const unit = this.getUnit(p.unit)
    return `Վաճառվում է ${subType} ${region}ի մարզի ${city}ի շրջանում, գինը 1 ${unit}ը ${price} դրամ`
  })
}

LastProposalsContent.prototype.ru = function() {
  return this.list.map((p) => {
    const subType = this.getSubTypeLower(p.subType)
    const price = p.price;
    const unit = this.getUnit(p.unit)
    return `Продается ${subType} в Армении, цена ${price} драм за 1 ${unit}`
  })
}

LastProposalsContent.prototype.en = function() {
  return this.list.map((p) => {
    const subType = this.getSubType(p.subType)
    const price = p.price;
    const unit = this.getUnit(p.unit)
    return `${subType} for sale in Armenia, price is ${price} drams for 1 ${unit}`
  })
}

function LastDemandsContent(list, content) {
  LastStatemants.call(this, list, content)
}

LastDemandsContent.prototype = Object.create(LastStatemants.prototype)

LastDemandsContent.prototype.hy = function() {
  return this.list.map((d) => {
    const region = this.getRegion(d.region)
    const city = this.getCity(d.city)
    const subType = this.getSubTypeLower(d.subType)
    const price = d.price;
    const unit = this.getUnit(d.unit)
    return `Փնտրվում է ${subType} ${region}ի մարզի ${city}ի շրջանում, գինը 1 ${unit}ը ${price} դրամ`
  })
}

LastDemandsContent.prototype.ru = function() {
  return this.list.map((d) => {
    const subType = this.getSubTypeLower(d.subType)
    const price = d.price;
    const unit = this.getUnit(d.unit)
    return `Ищу ${subType} в Армении, цена ${price} драм за 1 ${unit}`
  })
}

LastDemandsContent.prototype.en = function() {
  return this.list.map((d) => {
    const subType = this.getSubTypeLower(d.subType)
    const price = d.price;
    const unit = this.getUnit(d.unit)
    return `Looking for ${subType} in Armenia, price is ${price} drams for 1 ${unit}`
  })
}

export { LastProposalsContent, LastDemandsContent }