import { chunkTree } from './ChunkModule'

test('chunkTree with chunks of one', () => {
    expect(chunkTree("", 1)).toEqual({"text":""});

    expect(chunkTree("a", 1)).toEqual({"text":"a"});

    expect(chunkTree("abc", 1)).toEqual({
        "text":"abc",
        "left":[{
            "text":"ab",
            "left":[{
                "text":"a"}],
            "right":[{
                "text":"b"}]}],
        "right":[{
            "text":"c"}]});

    expect(chunkTree("abcdef", 1)).toEqual({
        "text":"abcdef",
        "left":[{
            "text":"abc",
            "left":[{
                "text":"ab",
                "left":[{
                    "text":"a"}],
                "right":[{
                    "text":"b"}]}],
            "right":[{
                "text":"c"}]}],
        "right":[{
            "text":"def",
            "left":[{
                "text":"de",
                "left":[{
                    "text":"d"}],
                "right":[{
                    "text":"e"}]}],
            "right":[{
                "text":"f"}]}]});
});

test('chunkTree with chunks of three', () => {
    expect(chunkTree("abc", 3)).toEqual({"text":"abc"});

    expect(chunkTree("abcdef", 3)).toEqual({
        "text":"abcdef",
        "left":[{
            "text":"abc"}],
        "right":[{
            "text":"def"}]});

    expect(chunkTree("1234567890", 3)).toEqual({
        "text":"1234567890",
        "left":[{
            "text":"123456",
            "left":[{
                "text":"123"}],
            "right":[{
                "text":"456"}]}],
        "right":[{
            "text":"7890"}]})
});

