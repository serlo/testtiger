export function proseWrapper(children: JSX.Element) {
  return (
    <div className="prose prose-p:text-gray-900 [&_small]:text-gray-600 prose-li:text-gray-900 [&_table]:text-gray-900">
      {children}
    </div>
  )
}
