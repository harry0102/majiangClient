var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Base64Util = (function () {
    function Base64Util() {
    }
    Base64Util.encode = function (data) {
        // Convert string to ByteArray
        var bytes = new egret.ByteArray();
        bytes.writeUTFBytes(data);
        // Return encoded ByteArray
        return this.encodeByteArray(bytes);
    };
    Base64Util.encodeByteArray = function (data) {
        // Initialise output
        var output = "";
        // Create data and output buffers
        var dataBuffer;
        var outputBuffer = new Array(4);
        // Rewind ByteArray
        data.position = 0;
        // while there are still bytes to be processed
        while (data.bytesAvailable > 0) {
            // Create new data buffer and populate next 3 bytes from data
            dataBuffer = new Array();
            for (var i = 0; i < 3 && data.bytesAvailable > 0; i++) {
                dataBuffer[i] = data.readUnsignedByte();
            }
            // Convert to data buffer Base64 character positions and 
            // store in output buffer
            outputBuffer[0] = (dataBuffer[0] & 0xfc) >> 2;
            outputBuffer[1] = ((dataBuffer[0] & 0x03) << 4) | ((dataBuffer[1]) >> 4);
            outputBuffer[2] = ((dataBuffer[1] & 0x0f) << 2) | ((dataBuffer[2]) >> 6);
            outputBuffer[3] = dataBuffer[2] & 0x3f;
            // If data buffer was short (i.e not 3 characters) then set
            // end character indexes in data buffer to index of '=' symbol.
            // This is necessary because Base64 data is always a multiple of
            // 4 bytes and is basses with '=' symbols.
            for (var j = dataBuffer.length; j < 3; j++) {
                outputBuffer[j + 1] = 64;
            }
            // Loop through output buffer and add Base64 characters to 
            // encoded data string for each character.
            for (var k = 0; k < outputBuffer.length; k++) {
                output += this.BASE64_CHARS.charAt(outputBuffer[k]);
            }
        }
        // Return encoded data
        return output;
    };
    Base64Util.decode = function (data) {
        // Decode data to ByteArray
        var bytes = this.decodeToByteArray(data);
        // Convert to string and return
        return bytes.readUTFBytes(bytes.length);
    };
    Base64Util.decodeToByteArray = function (data) {
        // Initialise output ByteArray for decoded data
        var output = new egret.ByteArray();
        // Create data and output buffers
        var dataBuffer = new Array(4);
        var outputBuffer = new Array(3);
        // While there are data bytes left to be processed
        for (var i = 0; i < data.length; i += 4) {
            // Populate data buffer with position of Base64 characters for
            // next 4 bytes from encoded data
            for (var j = 0; j < 4 && i + j < data.length; j++) {
                dataBuffer[j] = this.BASE64_CHARS.indexOf(data.charAt(i + j));
            }
            // Decode data buffer back into bytes
            outputBuffer[0] = (dataBuffer[0] << 2) + ((dataBuffer[1] & 0x30) >> 4);
            outputBuffer[1] = ((dataBuffer[1] & 0x0f) << 4) + ((dataBuffer[2] & 0x3c) >> 2);
            outputBuffer[2] = ((dataBuffer[2] & 0x03) << 6) + dataBuffer[3];
            // Add all non-padded bytes in output buffer to decoded data
            for (var k = 0; k < outputBuffer.length; k++) {
                if (dataBuffer[k + 1] == 64)
                    break;
                output.writeByte(outputBuffer[k]);
            }
        }
        // Rewind decoded data ByteArray
        output.position = 0;
        // Return decoded data
        return output;
    };
    return Base64Util;
}());
Base64Util.BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
Base64Util.version = "1.0.0";
__reflect(Base64Util.prototype, "Base64Util");
