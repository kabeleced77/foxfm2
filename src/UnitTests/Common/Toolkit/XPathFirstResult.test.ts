import { XPathFirstResult } from "../../../Common/Toolkit/XPathFirstResult";

test('The given XPath string is returned by method xPathString()', () => {
  var expectedXpathString = "Expected XPath String";
  var document = document;
  expect(new XPathFirstResult(document, expectedXpathString).xPathString()).toBe(expectedXpathString);
});

test('The given XPath string returns correspondent node by method node()', () => {
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';
  var expectedXpathString = '//*[@id="username"]';
  expect(new XPathFirstResult(document, expectedXpathString).node().nodeName).toBe('SPAN');
});

test('The given XPath string returns first found node by method node()', () => {
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="username" />' +
    '</div>';
  var expectedXpathString = '//*[@id="username"]';
  expect(new XPathFirstResult(document, expectedXpathString).node().nodeName).toBe('SPAN');
});

test('The given XPath string returns first found node by method node() independently from node name', () => {
  document.body.innerHTML =
    '<div>' +
    '  <button id="username" />' +
    '  <span id="username" />' +
    '</div>';
  var expectedXpathString = '//*[@id="username"]';
  expect(new XPathFirstResult(document, expectedXpathString).node().nodeName).toBe('BUTTON');
});
