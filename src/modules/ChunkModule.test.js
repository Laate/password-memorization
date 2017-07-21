import { chunkTree } from './ChunkModule'

test('chunkTree with chunks of one', () => {
    expect(chunkTree("a", 1)).toEqual({"leftText":"a","rightText":""});

    expect(chunkTree("abc", 1)).toEqual({
        "leftText":"ab",
        "rightText":"c",
        "left":[{
            "leftText":"a",
            "rightText":"b",
            "left":[{
                "leftText":"a",
                "rightText":""}],
            "right":[{
                "leftText":"b",
                "rightText":""}]}],
        "right":[{
            "leftText":"c",
            "rightText":""}]});

    expect(chunkTree("abcdef", 1)).toEqual({
        "leftText":"abc",
        "rightText":"def",
        "left":[{
            "leftText":"ab",
            "rightText":"c",
            "left":[{
                "leftText":"a",
                "rightText":"b",
                "left":[{
                    "leftText":"a",
                    "rightText":""}],
                "right":[{
                    "leftText":"b",
                    "rightText":""}]}],
            "right":[{
                "leftText":"c",
                "rightText":""}]}],
        "right":[{
            "leftText":"de",
            "rightText":"f",
            "left":[{
                "leftText":"d",
                "rightText":"e",
                "left":[{
                    "leftText":"d",
                    "rightText":""}],
                "right":[{
                    "leftText":"e",
                    "rightText":""}]}],
            "right":[{
                "leftText":"f",
                "rightText":""}]}]})
});

test('chunkTree with chunks of three', () => {
    expect(chunkTree("abc", 3)).toEqual({"leftText":"abc","rightText":""});

    expect(chunkTree("abcdef", 3)).toEqual({
        "leftText":"abc",
        "rightText":"def",
        "left":[{
            "leftText":"abc",
            "rightText":""}],
        "right":[{
            "leftText":"def",
            "rightText":""}]});

    expect(chunkTree("1234567890", 3)).toEqual({
        "leftText":"123456",
        "rightText":"7890",
        "left":[{
            "leftText":"123",
            "rightText":"456",
            "left":[{
                "leftText":"123",
                "rightText":""}],
            "right":[{
                "leftText":"456",
                "rightText":""}]}],
        "right":[{
            "leftText":"7890",
            "rightText":""}]})
});

