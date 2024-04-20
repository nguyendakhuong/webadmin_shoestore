const sidebarNav = [
  {
    link: '/admin',
    section: 'admin',
    icon: <image></image>,
    text: 'customerManagement',
  },

  {
    link: '/admin/product',
    section: 'product',
    icon: <i className="bx bx-cube"></i>,
    text: 'productManagement',
  },
  {
    link: '/admin/order',
    section: 'order',
    icon: <i className="bx bx-cube"></i>,
    text: 'orderManagement',
  },
  {
    link: '/admin/statistical',
    section: 'statistical',
    icon: <i className="bx bx-cube"></i>,
    text: 'statisticsRevenue',
  },
  {
    link: '/admin/discountcode',
    section: 'discountcode',
    icon: <i className="bx bx-cube"></i>,
    text: 'manageDiscountCodes',
  },
]

const CONFIG_ADMIN = {
  sidebarNav,
}
export default CONFIG_ADMIN
