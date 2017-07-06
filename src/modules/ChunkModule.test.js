import { getChunks, getChunksSequential } from './ChunkModule'

test('getChunks with chunks of one', () => {
    expect(getChunks("a", 1)).toEqual([{"left": "a", "right": ""}]);

    expect(getChunks("ab", 1)).toEqual([
        {"left":"a","right":""},
        {"left":"","right":"b"},
        {"left":"a","right":"b"}]);

    expect(getChunks("abc", 1)).toEqual([
        {"left":"a","right":""},
        {"left":"","right":"b"},
        {"left":"a","right":"b"},
        {"left":"","right":"c"},
        {"left":"ab","right":"c"}]);

    expect(getChunks("123456789", 1)).toEqual([
        {"left":"1","right":""},
        {"left":"","right":"2"},
        {"left":"1","right":"2"},
        {"left":"","right":"3"},
        {"left":"12","right":"3"},
        {"left":"4","right":""},
        {"left":"","right":"5"},
        {"left":"4","right":"5"},
        {"left":"123","right":"45"},
        {"left":"6","right":""},
        {"left":"","right":"7"},
        {"left":"6","right":"7"},
        {"left":"8","right":""},
        {"left":"","right":"9"},
        {"left":"8","right":"9"},
        {"left":"67","right":"89"},
        {"left":"12345","right":"6789"}])
});

test('getChunks with chunks of three', () => {
    expect(getChunks("a", 3)).toEqual([{"left": "a", "right": ""}]);

    expect(getChunks("abc", 3)).toEqual([{"left": "abc", "right": ""}]);

    expect(getChunks("abcd", 3)).toEqual([
        {"left":"ab","right":""},
        {"left":"","right":"cd"},
        {"left":"ab","right":"cd"}]);

    expect(getChunks("abcdef", 3)).toEqual([
        {"left":"abc","right":""},
        {"left":"","right":"def"},
        {"left":"abc","right":"def"}]);

    expect(getChunks("abcdefgh", 3)).toEqual([
        {"left":"abc","right":""},
        {"left":"def","right":""},
        {"left":"","right":"gh"},
        {"left":"def","right":"gh"},
        {"left":"abc","right":"defgh"}]);

    expect(getChunks("abcdef123", 3)).toEqual([
        {"left":"abc","right":""},
        {"left":"","right":"def"},
        {"left":"abc","right":"def"},
        {"left":"","right":"123"},
        {"left":"abcdef","right":"123"}])
});

test('getChunks with chunks of 10', () => {
    expect(getChunks("a", 10)).toEqual([{"left": "a", "right": ""}]);

    expect(getChunks("abc", 10)).toEqual([{"left": "abc", "right": ""}]);

    expect(getChunks("abcdefghi", 10)).toEqual([{"left": "abcdefghi", "right": ""}]);

    expect(getChunks("abcdefghi1", 10)).toEqual([{"left": "abcdefghi1", "right": ""}]);

    expect(getChunks("abcdefghi12", 10)).toEqual([
        {"left":"abcdef","right":""},
        {"left":"","right":"ghi12"},
        {"left":"abcdef","right":"ghi12"}]);

    expect(getChunks("We are trying to prove ourselves wrong as quickly as possible, because only in that way can we find progress.", 10)).toEqual([
            {"left":"We are try","right":""},{"left":"","right":"ing to pro"},
            {"left":"We are try","right":"ing to pro"},{"left":"","right":"ve ourselv"},
            {"left":"We are trying to pro","right":"ve ourselv"},
            {"left":"es wrong a","right":""},
            {"left":"","right":"s quickly "},
            {"left":"es wrong a","right":"s quickly "},
            {"left":"We are trying to prove ourselv","right":"es wrong as quickly "},
            {"left":"as possibl","right":""},
            {"left":"","right":"e, because"},
            {"left":"as possibl","right":"e, because"},
            {"left":"","right":" only in t"},
            {"left":"as possible, because","right":" only in t"},
            {"left":"hat way ca","right":""},
            {"left":"n we find ","right":""},
            {"left":"","right":"progress."},
            {"left":"n we find ","right":"progress."},
            {"left":"hat way ca","right":"n we find progress."},
            {"left":"as possible, because only in t","right":"hat way can we find progress."},
            {"left":"We are trying to prove ourselves wrong as quickly ","right":"as possible, because only in that way can we find progress."}])
});

test('getChunksSequential with chunks of 1', () => {
    expect(getChunksSequential("a", 1)).toEqual(["a"]);

    expect(getChunksSequential("abcd", 1)).toEqual(["a", "b", "c", "d"]);

    expect(getChunksSequential("123456789abcdefghijklmnopqrstuvwxyz!#¤%&/(()=?*>_:; ", 1)).toEqual([
        "1","2","3","4","5","6","7","8","9","a","b","c","d",
        "e","f","g","h","i","j","k","l","m","n","o","p","q",
        "r","s","t","u","v","w","x","y","z","!","#","¤","%",
        "&","/","(","(",")","=","?","*",">","_",":",";"," "])
});

test('getChunksSequential with chunks of 3', () => {
   expect(getChunksSequential("a", 3)).toEqual(["a"]);

   expect(getChunksSequential("abc", 3)).toEqual(["abc"]);

   expect(getChunksSequential("abcd", 3)).toEqual(["abc", "d"]);

   expect(getChunksSequential("abcdefghi", 3)).toEqual(["abc", "def", "ghi"]);

   expect(getChunksSequential("12345678912345", 3)).toEqual(["123", "456", "789", "123", "45"]);

   expect(getChunksSequential("d131dd02c5e6eec4693d9a0698aff95c 2fcab58712467eab4004583eb8fb7f89", 3)).toEqual([
       "d13","1dd","02c","5e6","eec","469","3d9","a06","98a","ff9","5c ",
       "2fc","ab5","871","246","7ea","b40","045","83e","b8f","b7f","89"])
});
