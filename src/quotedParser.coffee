chinese = require 'toolkit/iconv'
utils = require '../utils'
DBFParser = require './parser'

class QuotedDBFParser extends DBFParser

    constructor: (@buffer, @mask, type) ->
        @marketTool = require '../market/'+type

    parse: =>
        @parseHeader()
        sequenceNumber = 0
        loc = @header.start
        records = []
        buffer = @buffer
        while loc < (@header.start + @header.numberOfRecords * @header.recordLength) and loc < buffer.length
            if ((mask.slice loc, loc += @header.recordLength).exist() || sequenceNumber is 0)
                records.push @parseRecord ++sequenceNumber, buffer.slice loc - @header.recordLength, loc

        return {time: @marketTool.getTimestamp(records.shift()), name: @marketTool.marketName, records: records}

    parseHeader: =>
        super()
        @header.fields = @marketTool.resetHeaders @header.fields

    parseRecord: (sequenceNumber, buffer) =>
        record = super sequenceNumber, buffer
        record['@isIndex'] = @marketTool.isIndex record
        record.ZQDM = record.ZQDM.toString('ascii').replace(/(^0+|\s+$)/,'')
        record.ZQJC = chinese.toASCII(chinese.convert(record.ZQJC)).replace(/\s+/g, ' ').replace(/([^a-zA-Z0-9])\s([^a-zA-Z0-9])/g, '$1$2').trim()
        if record.ZQJC.length is 0
            record.ZQJC = record.ZQDM
        if  @marketTool.transCharset
            return  @marketTool.transCharset record
        return record

    parseField: (field, buffer) =>

        if !field.raw
            value = +(buffer.toString 'ascii')
        else
            value = buffer

        return value

module.exports = QuotedDBFParser
