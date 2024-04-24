import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import APP_LOCAL from '../localStorage'

const language = APP_LOCAL.getLanguageStorage()
i18n.use(initReactI18next).init({
  debug: true,
  lng: language || 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    vi: {
      translation: {
        loading: 'Đang tải dữ liệu',
        banAccount: 'Khóa tài khoản',
        openAccount: 'Mở tài khoản',
        verified: 'Đã xác thực',
        notYetAuthenticated: 'Chưa xác thực',
        userManagement: 'Quản lý người dùng',
        userList: 'Danh sách tài khoản người dùng',
        userCode: 'Mã người dùng',
        name: 'Tên',
        veriEmail: 'Xác minh Email',
        status: 'Trạng thái',
        search: 'Tìm kiếm',
        addProduct: '+ Thêm sản phẩm',
        products: 'Danh sách sản phẩm',
        productCode: 'Mã sản phẩm',
        price: 'Giá',
        image: 'Hình ảnh',
        discount: 'Giảm giá',
        startDate: 'Ngày bắt đầu',
        endDate: 'Ngày kết thúc',
        describe: 'Mô tả',
        introduce: 'Giới thiệu',
        quantity: 'Số lượng',
        act: 'Hành động',
        category: 'Loại',
        active: 'Đang hoạt động',
        inactive: 'Không hoạt động',
        orders: 'Danh sách đơn hàng',
        orderCode: 'Mã đơn hàng',
        money: 'Số tiền thanh toán',
        phone: 'Số điện thoại',
        time: 'Thời gian',
        address: 'Địa chỉ',
        cancelOrder: 'Hủy đơn hàng',
        OrderConfirmation: 'Xác nhận đơn hàng',
        receive: 'Nhận hàng',
        confirm: 'Xác nhận',
        searchPhone: 'Tìm kiếm theo số điện thoại',
        codes: 'Danh sách mã giảm giá',
        addCodes: '+ Thêm mã giảm giá',
        nameCode: 'Mã giảm giá',
        direct: 'Giảm tiền trực tiếp',
        decrease: 'Giảm theo %',
        statistics: 'Thống kê doanh thu',
        statisticalDetails: 'Chi tiết thống kê',
        totalMonthlyOrder: 'Tổng đơn tháng',
        totalNumberOfProduct: 'Tổng số lượng sản phẩm',
        numberOfAccounts: 'Số lượng tài khoản',
        numberOfProducts: 'Số lượng sản phẩm',
        numberOfOrders: 'Số lượng đơn hàng',
        monthlyRevenue: 'Doanh thu tháng',
        top5Products: 'Top 5 sản phẩm bán chạy',
        from: 'Từ',
        to: 'Đến',
        statistical: 'Biểu đồ thống kê',
        selectProduct: 'Chọn sản phẩm',
        potentialCustomers: 'Khách hàng tiềm năng',
        totalNumberOfOrders: 'Tổng số đơn hàng',
        purchaseUserAccount: 'Tài khoản người dùng mua hàng',
        account: 'Tài khoản',
        revenue: 'Doanh thu',
        numberOfProductsPurchased: 'Số lượng sản phẩm đã mua',
        noData: 'Không có dữ liệu',
        add: 'Thêm sản phẩm',
        loadImage: 'Tải ảnh',
        deletePhotos: 'Xóa ảnh',
        back: 'Quay lại',
        nameProduct: 'Tên sản phẩm',
        priceProduct: 'Giá sản phẩm',
        quantityProduct: 'Số lượng sản phẩm',
        discountProduct: 'Giảm giá sản phẩm',
        introductionProduct: 'Giới thiệu sản phẩm',
        enterDescription: 'Nhập mô tả ...',
        enter: 'Nhập ... ',
        shoe: 'Giày',
        sandal: 'Dép',
        repairProducts: 'Sửa sản phẩm',
        updateProducts: 'Cập nhật sản phẩm',
        require: 'Vui lòng nhập trường này !',
        customerManagement: 'Quản lý khách hàng',
        productManagement: 'Quản lý sản phẩm',
        orderManagement: 'Quản lý đơn hàng',
        statisticsRevenue: 'Thống kê - doanh thu',
        manageDiscountCodes: 'Quản lý mã giảm giá',
        logout: 'Đăng xuất',
        login: 'Đăng nhập',
        pw: 'Mật khẩu',
        managementAccounts: 'Danh sách tài khoản quản lý',
        role: 'Vai trò',
        registerAccount: 'Đăng ký tài khoản',
        creactAccount: '+ Tạo tài khoản mới',
        signup: 'Đăng ký',
        orderDetails: 'Chi tiết đơn hàng',
        total: 'Tổng tiền',
        createOrder: 'Đang chờ xác nhận',
        delivering: 'Đang giao hàng',
        configOrder: 'Đã nhận hàng',
        orderCancel: 'Đơn hàng đã bị hủy',
        paidCreateOrder: 'Đơn hàng đã thanh toán và chờ xác nhận',
        paidDelivering: 'Đơn hàng đã thanh toán và đang giao hàng',
        PaidCancelOrder: 'Đơn hàng đã thanh toán và đã hủy',
        payment: 'Đơn hàng đã thanh toán nhưng có lỗi',
        PaymentAndCancel: 'Đơn hàng đã thanh toán nhưng có lỗi và đã hủy',
        confirmed: 'Đã xác nhận',
        notification: 'Thông báo',
        youMustNot: 'Bạn không được thực hiện điều này',
        userDetails: 'Thông tin người dùng',
        dob: 'Ngày sinh',
        gender: 'Giới tính',
        city: 'Thành phố',
      },
    },
    en: {
      translation: {
        loading: 'Loading',
        banAccount: 'Ban Account',
        openAccount: 'Open Account',
        verified: 'verified',
        notYetAuthenticated: 'Not yet authenticated',
        userManagement: 'User management',
        userList: 'User list',
        userCode: 'User Code',
        name: 'Name',
        veriEmail: 'Verify email',
        status: 'Status',
        search: 'Search',
        addProduct: '+ Add products',
        products: 'List of products',
        productCode: 'Product Code',
        price: 'Price',
        image: 'Image',
        discount: 'Discount',
        startDate: 'Start Date',
        endDate: 'End Date',
        describe: 'Describe',
        introduce: 'Introduce',
        quantity: 'Quantity',
        act: 'Activity',
        category: 'category',
        active: 'Active',
        inactive: 'Inactive',
        orders: 'List of orders',
        orderCode: 'Oder Code',
        money: 'Payment amount',
        phone: 'Phone number',
        time: 'Time',
        address: 'Address',
        cancelOrder: 'Cancel Order',
        OrderConfirmation: 'Order Confirmation',
        receive: 'Receive',
        confirm: 'Confirm',
        searchPhone: 'Search by phone number',
        codes: 'List of discount codes',
        addCodes: '+ Add discount code',
        nameCode: 'Discount code',
        direct: 'Direct discount',
        decrease: 'Decrease by percentage',
        statistics: 'Revenue statistics',
        statisticalDetails: 'Statistical details',
        totalMonthlyOrder: 'Total monthly orders',
        totalNumberOfProduct: 'Total number of product',
        numberOfAccounts: 'Number of accounts',
        numberOfProducts: 'Number of products',
        numberOfOrders: 'Number of orders',
        monthlyRevenue: 'Monthly revenue',
        top5Products: 'Top 5 best-selling products',
        from: 'From',
        to: 'To',
        statistical: 'Statistical chart',
        selectProduct: 'Select product',
        potentialCustomers: 'Potential customers',
        totalNumberOfOrders: 'Total number of orders',
        purchaseUserAccount: 'purchase user account',
        account: 'Account',
        revenue: 'Revenue',
        numberOfProductsPurchased: 'Number of products purchased',
        noData: 'No data',
        add: 'Add product',
        loadImage: 'Load image',
        deletePhotos: 'Delete photos',
        back: 'Back',
        nameProduct: 'Name product',
        priceProduct: 'Price product',
        quantityProduct: 'Quantity product',
        discountProduct: 'Discount Product',
        introductionProduct: 'Introduction product',
        enterDescription: 'Enter a description ...',
        enter: 'Enter ... ',
        shoe: 'Shoe',
        sandal: 'Sandal',
        repairProducts: 'Repair products',
        updateProducts: 'Updates products',
        require: 'Please enter this field!',
        customerManagement: 'Customer management',
        productManagement: 'Product management',
        orderManagement: 'Order management',
        statisticsRevenue: 'Statistics-Revenue',
        manageDiscountCodes: 'Manage discount codes',
        logout: 'Logout',
        login: 'Log in',
        pw: 'Password',
        managementAccounts: 'List of management accounts',
        registerAccount: 'Register an account',
        creactAccount: '+ Creact account',
        signup: 'Signup',
        orderDetails: 'Order Details',
        total: 'Total amount',
        createOrder: 'Waiting for confirmation',
        delivering: 'Delivering',
        configOrder: 'Order received',
        orderCancel: 'Order canceled',
        paidCreateOrder: 'Order paid and waiting for confirmation',
        paidDelivering: 'Order paid and being delivered',
        PaidCancelOrder: 'Order paid and canceled',
        payment: 'Payment error',
        PaymentAndCancel: 'Payment error and canceled',
        confirmed: 'Confirmed',
        notification: 'Notification',
        youMustNot: 'You must not do this',
        userDetails: 'User details',
        dob: 'Date of birth',
        gender: 'Gender',
        city: 'City',
      },
    },
  },
})

export default i18n
