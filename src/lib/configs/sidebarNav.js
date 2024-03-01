const sidebarNav = [
  {
    link: '/admin',
    section: 'admin',
    icon: <image></image>,
    text: 'Quản lí User',
  },
  // {
  //   link: '/admin/orders',
  //   section: 'orders',
  //   icon: <i className="bx bx-receipt"></i>,
  //   text: 'Orders',
  // },

  {
    link: '/admin/product',
    section: 'product',
    icon: <i className="bx bx-cube"></i>,
    text: 'Quản lý sản phẩm ',
  },
  {
    link: '/admin/order',
    section: 'order',
    icon: <i className="bx bx-cube"></i>,
    text: 'Quản lý đơn hàng',
  },
  {
    link: '/admin/statistical',
    section: 'statistical',
    icon: <i className="bx bx-cube"></i>,
    text: 'Thống kê - Doanh thu',
  },
]

const CONFIG_ADMIN = {
  sidebarNav,
}
export default CONFIG_ADMIN
