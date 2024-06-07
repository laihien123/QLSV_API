// call back function
function hienThiThongBao(diem) {
  console.log(`Xin chúc mừng thí sinh đạt ${diem}`);
}

function tinhDiemTrungBinh(diemToan, diemVan, hienThiCauChao) {
  let diemTrungBinh = (diemToan + diemVan) / 2;
  hienThiCauChao(diemTrungBinh);
}

tinhDiemTrungBinh(9, 10, (diem) => {
  if (diem > 9) {
    console.log("quá giỏi");
  } else {
    console.log("quá kém");
  }
});

// Bất đồng bộ
// function lauNha() {
//   setTimeout(() => {
//     console.log("lau nhà");
//   }, 4000);
// }

// function nauCom() {
//   console.log("Nấu Cơm");
// }

// lauNha();

// nauCom();

// Promise

let promise = new Promise((resolve, reject) => {
  let tong = 50 + 50 - 2;
  setTimeout(() => {
    if (tong > 60) {
      resolve("Dữ liệu đã lấy về thành công");
    } else {
      reject("Dữ liệu lấy thất bại");
    }
  }, 4000);
});

// promise
//   .then((resolve) => {
//     console.log(resolve);
//     // lấy dữ liệu và hiển thị lên trên giao diện
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// async await (ES7)
// function layKetQua() {
//    try {
//     // pending - fullied - reject
//     let result = await promise;
//     console.log(result);
//    } catch (error) {
//     console.log(error)
//    }
// }
// layKetQua();

//------------------------------- Tương tác lấy dữ liệu từ backend với Axios ------------------------------
// Lấy danh sách sinh viên
function layDanhSachSinhVien() {
  let promise = axios({
    // Phương thức (method)
    method: "GET",
    // url (đường dẫn api)
    url: "https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien",
  });
  promise
    .then((res) => {
      console.log(res);
      renderSinhVienApi(res.data);
    })
    .catch((err) => {
      console.log(err);
      handleError("Có lỗi xảy ra vui lòng thử lại");
    });
}

layDanhSachSinhVien();

// Chức năng hiển thị thông tin sinh viên lên table
function renderSinhVienApi(arr) {
  let content = "";
  arr.forEach((item, index) => {
    // destructuring
    let {
      maSinhVien,
      tenSinhVien,
      loaiSinhVien,
      diemToan,
      diemLy,
      diemHoa,
      diemRenLuyen,
      email,
      soDienThoai,
    } = item;
    let diemTrungBinh = (diemToan + diemLy + diemHoa + diemRenLuyen) / 4;
    content += `
    <tr>
        <td>${maSinhVien}</td>
        <td>${tenSinhVien}</td>
        <td>${email}</td>
        <td>${soDienThoai}</td>
        <td>${loaiSinhVien}</td>
        <td>${diemTrungBinh}</td>
        <td>
         <button class="btn btn-danger">Xóa</button>
         <button class="btn btn-warning">Sửa</button>
        </td>
    </tr>
    `;
  });
  // gọi tới câu lệnh dom để thực hiện hiển thị lên giao diện
  document.getElementById("tableBody").innerHTML = content;
}

// Hiển thị thông báo lỗi cho người dùng
function handleError(text, duration = 3000) {
  Toastify({
    // text giúp thông báo lỗi : sử dụng cơ chế từ object literal (ES6)
    text,
    // Thời gian diễn ra thông báo
    duration,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: "bg-danger text-white",
    // style: {
    //   background: "linear-gradient(to right, #00b09b, #96c93d)",
    // },
  }).showToast();
}

// Chức năng thêm sinh viên
function AddSinhVienApi(event) {
  event.preventDefault();
  // Thực hiện truy cập tới tất cả input và select cảu form
  let arrField = document.querySelectorAll("#formQLSV input, #formQLSV select");
  let sinhVien = {};
  for (let field of arrField) {
    // id = tenSinhVien
    let { id, value } = field;
  }
  console.log(sinhVien);
}

document.getElementById("formQLSV").onsubmit = AddSinhVienApi;
