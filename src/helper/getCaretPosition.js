export function getCaretPosition(editableDiv) {
  let caretPos = 0
  let selection = window.getSelection()
  if (selection.rangeCount > 0) {
    let range = selection.getRangeAt(0)
    let preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(editableDiv)
    preCaretRange.setEnd(range.endContainer, range.endOffset)

    const tempDiv = document.createElement('div')
    tempDiv.appendChild(preCaretRange.cloneContents())
    const textWithSmileys = tempDiv.innerHTML

    caretPos = textWithSmileys.length
  }
  return caretPos
}
