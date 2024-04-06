type RenderListItemsProps<T> = {
  items: T[];
  renderItem: (item: T) => JSX.Element;
  className?: string;
};
const RenderListItems = <T,>({ items, renderItem, className }: RenderListItemsProps<T>) => {
  return (
    <ul className={className ?? ""}>
      {items.map((item: T, index: number) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default RenderListItems;
