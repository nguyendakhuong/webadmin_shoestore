// const TableRow = ({ product, handleEdit, handleDelete }) => {
//     return (
//       <tr onClick={() => setIsDialogOpen(true)}>
//         <td>{product.id}</td>
//         <td>{product.name}</td>
//         <td>{product.price}</td>
//         <td>
//           <img src={product.imageProduct} alt={product.name} />
//         </td>
//         <td>{product.priceSale ? product.priceSale : "null"}</td>
//         <td>
//           {product.timeSaleStart ? moment(product.timeSaleStart).format("DD/MM/YYYY") : "null"}
//         </td>
//         <td>
//           {product.timeSaleEnd ? moment(product.timeSaleEnd).format("DD/MM/YYYY") : "null"}
//         </td>
//         <td>{product.description}</td>
//         <td>{product.introduce}</td>
//         <td>{product.quantity}</td>
//         <td>{product.category}</td>
//         <td>
//           <button>{product.status === 1 ? "Dừng hoạt động" : "Bật hoạt động"}</button>
//         </td>
//         <td>
//           <button onClick={(e) => handleEdit(product, e)}>
//             <img src={editIcon} alt="Edit" style={{ width: "20px" }} />
//           </button>
//           <button onClick={(e) => handleDelete(product, e)}>
//             <img src={deleteIcon} alt="Delete" style={{ width: "20px" }} />
//           </button>
//         </td>
//       </tr>
//     );
//   };

// export default TableRow