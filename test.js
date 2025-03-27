function twoNum(nums, target) {
  const m = new Map()
  for (let i = 0; i < nums.length; i++) {
    let n = target - nums[i]
    if (m.has(n)) {
      return [m.get(n), i]
    }
    m.set(nums[i], i)
  }
  return null
}

console.log(twoNum([2, 7, 11, 15], 9))

function insert(element, index) {
  if (index >= 0 && index <= this.count) {
    // {1}
    const node = new Node(element)
    if (index === 0) {
      // 在第一个位置添加
      const current = this.head
      node.next = current // {2}
      this.head = node
    } else {
      const previous = this.getElementAt(index - 1) // {3}
      const current = previous.next // {4}
      node.next = current // {5}
      previous.next = node // {6}
    }
    this.count++ // 更新链表的长度
    return true
  }
  return false // {7}
}


// 测试