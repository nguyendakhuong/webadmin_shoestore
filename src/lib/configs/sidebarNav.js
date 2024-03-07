const sidebarNav = [
  {
    link: '/admin',
    section: 'admin',
    icon: <image></image>,
    text: 'Quản lí User',
  },

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
  {
    link: '/admin/discountcode',
    section: 'discountcode',
    icon: <i className="bx bx-cube"></i>,
    text: 'Quản lí mã giảm giá',
  },
]

const CONFIG_ADMIN = {
  sidebarNav,
}
export default CONFIG_ADMIN
