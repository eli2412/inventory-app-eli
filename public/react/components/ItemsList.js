export const ItemsList = ({items, onTitleClick}) => {
	return <>
		{
			items.map((item, idx) => {
				
				return (
				<div>
				<button key={idx} onClick={() => onTitleClick(item.id)}>{item.name}</button>
				</div>
				)
			})
		}
	</>
}