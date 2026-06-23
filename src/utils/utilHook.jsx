import moment from 'moment-timezone';
import { DateTime } from 'luxon';

export const formatHarga = (harga) => {
  if (!harga) return '0';

  const [integerPart, decimalPart] = harga.toString().split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Batasi maksimal 3 digit desimal (dan hilangkan jika tidak ada)
  if (decimalPart !== undefined) {
    const limitedDecimal = decimalPart.substring(0, 3);
    return `${formattedInteger},${limitedDecimal}`;
  }

  return formattedInteger;
};

export const formFormatRupiah = (value) => {
  if (!value) return ''
  return new Intl.NumberFormat('id-ID').format(value)
}

export const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi perlu +1
  const dd = String(today.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};

export const generateKodeRandom = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const formatTanggal = (tanggal) => {
  // Memisahkan string tanggal menggunakan '-'
  const [tahun, bulan, hari] = tanggal.split('-');

  // Mengembalikan format yang diinginkan
  return `${hari}-${bulan}-${tahun}`;
};

export const formatTanggalIndo = (tanggal) => {
  if (!tanggal) return '-'

  const date = new Date(tanggal)

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// pemisah dengan garis miring
export const formatTanggalGaring = (tanggal) => {
  // Memisahkan string tanggal menggunakan '-'
  const [tahun, bulan, hari] = tanggal.split('-');

  // Mengembalikan format yang diinginkan
  return `${hari}/${bulan}/${tahun}`;
};

export const formatTime = (time) => {
    if (!time) return '-';

    const [hour, minute] = time.split(':');
    return `${hour}:${minute}`;
};

export const convertDateFormat = (dateStr) => {
  // Pecah berdasarkan tanda '-'
  const [year, month, day] = dateStr.split('-');

  // Ambil 2 digit terakhir dari tahun
  const shortYear = year.slice(-2);

  // Gabungkan kembali dengan format baru
  return `${day}/${month}/${shortYear}`;
};

export const formatToIndonesianDate = (datetimeStr) => {
  const parts = datetimeStr.split(/[-T:.Z]/);
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  const hour = parts[3];
  const minute = parts[4];
  const second = parts[5];

  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
};

export const formatTanggalJam = (dateString) => {
  const [tanggal, waktu] = dateString.split(' '); // Pisahkan tanggal dan waktu
  const [tahun, bulan, hari] = tanggal.split('-'); // Pisahkan tahun, bulan, dan hari

  return `${hari}-${bulan}-${tahun} ${waktu}`;
};

export const formatTanggalJamLaporan = (dateString) => {
  const dateObj = new Date(dateString);

  const tahun = dateObj.getFullYear();
  const bulan = String(dateObj.getMonth() + 1).padStart(2, '0');
  const hari = String(dateObj.getDate()).padStart(2, '0');

  const jam = String(dateObj.getHours()).padStart(2, '0');
  const menit = String(dateObj.getMinutes()).padStart(2, '0');
  const detik = String(dateObj.getSeconds()).padStart(2, '0');

  return `${hari}-${bulan}-${tahun} ${jam}:${menit}:${detik}`;
};

export const capitalizeWords = (text) => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getFormattedDateTime = () => {
  return DateTime.now()
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat('yyyy-MM-dd HH:mm:ss');
};

export const formatTglByMoment = (isoString) => {
  return moment.utc(isoString).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss');
};

export const getTimeHours = () => {
  const time = new Date();

  const tanggal = time.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const jam = time.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return `${tanggal} ${jam}`;
};

export const getDayNameFromDate = (dateString) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(dateString); // format: 'YYYY-MM-DD'
  const dayIndex = date.getDay();

  return days[dayIndex];
};

export const formatDateTime = (dateTimeStr) => {
  const date = new Date(dateTimeStr);

  const padZero = (num) => (num < 10 ? '0' + num : num);

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // bulan dimulai dari 0
  const year = String(date.getFullYear()).slice(-2); // ambil 2 digit terakhir
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Fungsi baru untuk hanya mengambil tanggal (YYYY-MM-DD)
 * dari string datetime lengkap
 */
export const extractDateOnly = (dateTimeStr) => {
  if (!dateTimeStr) return '';
  // Mengambil bagian sebelum spasi pertama
  return dateTimeStr.split(' ')[0];
};

export const formatNoHP = (no) => {
  if (!no) return ''

  let cleaned = no.replace(/^62/, '')

  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 7) {
    return cleaned.replace(/(\d{3})(\d+)/, '$1-$2')
  }

  return cleaned.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')
}

/* Embed Video Youtube */
export const getYoutubeEmbedUrl = (url) => {
  if (!url) return ""

  let videoId = ""

  // youtube.com/watch?v=
  if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0]
  }

  // youtu.be/
  else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0]
  }

  return `https://www.youtube.com/embed/${videoId}`
}

export const formatPhoneNumber = (phone) => {

  if (!phone) return ""

  // hapus karakter selain angka
  let cleaned = phone.replace(/\D/g, '')

  // ubah 08 -> 628
  if (cleaned.startsWith('08')) {
    cleaned = '62' + cleaned.substring(1)
  }

  return cleaned
}

export const capitalizeFirstLetter = (text = "") => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const cleanTemplateIndent = (text) => {
    return text
        .split('\n')
        .map(line => line.trimStart())
        .join('\n')
}