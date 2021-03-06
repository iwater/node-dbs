Header = require './header'

class DBFParser

    constructor: (@buffer) ->

    parse: =>
        @parseHeader()
        sequenceNumber = 0
        loc = @header.start
        records = []
        buffer = @buffer
        while loc < (@header.start + @header.numberOfRecords * @header.recordLength) and loc < buffer.length
            records.push @parseRecord ++sequenceNumber, buffer.slice loc, loc += @header.recordLength

        return records

    parseHeader: =>
        @header = new Header @buffer
        @header.parse()

    parseRecord: (sequenceNumber, buffer) =>
        record = {
            '@sequenceNumber': sequenceNumber
            '@deleted': (buffer.slice 0, 1)[0] isnt 32
        }

        loc = 1
        for field in @header.fields
            do (field) =>
                record[field.name] = @parseField field, buffer.slice loc, loc += field.length

        return record

    parseField: (field, buffer) =>
        value = (buffer.toString 'utf-8').replace /^\x20+|\x20+$/g, ''

        if field.type is 'N' then value = parseInt value, 10

        return value

module.exports = DBFParser
