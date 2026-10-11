<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="KARY LITE Robotic Pool Cleaner, wireless & wired automatic swimming pool robot for villa, hotel, commercial pool">
    <title>KARY LITE | Smart Pool Robot</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Roboto, Arial, sans-serif;
        }
        :root {
            --primary: #0066cc;
            --primary-dark: #004488;
            --dark: #0f243c;
            --light: #f4f8fc;
            --gray: #555;
            --white: #ffffff;
            --shadow: 0 4px 14px rgba(0,0,0,0.09);
        }
        body {
            background-color: var(--light);
            color: #333;
            line-height: 1.65;
            overflow-x: hidden;
        }
        .container {
            width: 94%;
            max-width: 1300px;
            margin: 0 auto;
        }

        /* 导航栏 */
        header {
            background: var(--white);
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .nav-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.9rem 0;
        }
        .logo {
            font-size: 1.45rem;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
        }
        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        .nav-links a {
            text-decoration: none;
            color: var(--dark);
            font-weight: 500;
            transition: color .2s;
        }
        .nav-links a:hover {
            color: var(--primary);
        }
        .lang-selector {
            padding: 7px 10px;
            border: 1px solid #d1dbe8;
            border-radius: 6px;
            background: #fff;
        }
        .hamburger {
            display: none;
            border: none;
            background: transparent;
            font-size: 1.8rem;
            cursor: pointer;
            padding: 4px 8px;
        }

        /* Hero首屏 */
        .hero {
            background: linear-gradient(rgba(0,35,70,0.72), rgba(0,35,70,0.72)), url("https://placehold.co/1920x750/005599/ffffff?text=Smart+Pool+Robot+Hero");
            background-size: cover;
            background-position: center;
            color: var(--white);
            padding: 5.5rem 0;
            text-align: center;
        }
        .hero h1 {
            font-size: 2.7rem;
            margin-bottom: 1rem;
        }
        .hero p {
            font-size: 1.12rem;
            max-width:720px;
            margin:0 auto 2.2rem;
        }
        .btn {
            display: inline-block;
            background: var(--primary);
            color: white;
            padding:13px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: background 0.25s;
        }
        .btn:hover {
            background: var(--primary-dark);
        }
        .btn-outline {
            background: transparent;
            border:2px solid #ffffff;
            margin-left:14px;
        }
        .btn-outline:hover {
            background: rgba(255,255,255,0.12);
        }

        /* 通用区块 */
        section {
            padding:4.2rem 0;
        }
        .section-title {
            text-align:center;
            font-size:2rem;
            color: var(--dark);
            margin-bottom:2.8rem;
        }

        /* 产品图文模块 */
        .product-block {
            background: #fff;
            border-radius:14px;
            box-shadow: var(--shadow);
            overflow:hidden;
            margin-bottom:2.2rem;
        }
        .product-row {
            display:grid;
            grid-template-columns: 1fr 1fr;
        }
        .product-img-wrap img {
            width:100%;
            height:100%;
            object-fit:cover;
            min-height:320px;
        }
        .product-text {
            padding:2.2rem;
        }
        .product-text h3 {
            font-size:1.6rem;
            margin-bottom:1rem;
            color: var(--dark);
        }
        .feature-list {
            margin:1rem 0 1.4rem;
        }
        .feature-list li {
            list-style: none;
            padding:6px 0;
            position:relative;
            padding-left:22px;
        }
        .feature-list li::before {
            content:"✓";
            color:var(--primary);
            position:absolute;
            left:0;
        }
        .spec-toggle {
            background:#edf4fb;
            border:none;
            padding:9px 16px;
            border-radius:6px;
            cursor:pointer;
            font-weight:500;
            margin-top:0.6rem;
        }
        .spec-panel {
            display:none;
            margin-top:1rem;
            padding:1rem;
            background:#f7fafe;
            border-radius:8px;
            font-size:0.92rem;
        }
        .spec-panel.open {
            display:block;
        }

        /* 项目案例 */
        .cases-section {
            background:#ffffff;
        }
        .cases-grid {
            display:grid;
            grid-template-columns: repeat(3,1fr);
            gap:1.8rem;
        }
        .case-card {
            background:#fff;
            border-radius:14px;
            overflow:hidden;
            box-shadow:var(--shadow);
        }
        .case-card img {
            width:100%;
            height:230px;
            object-fit:cover;
        }
        .case-content {
            padding:1.3rem;
        }
        .case-content h3 {
            margin-bottom:0.6rem;
            color:var(--dark);
        }

        /* 售后服务 */
        .service-section {
            background:#edf4fb;
        }
        .service-grid {
            display:grid;
            grid-template-columns: repeat(3,1fr);
            gap:1.5rem;
        }
        .service-item {
            background:#fff;
            padding:1.4rem;
            border-radius:10px;
            box-shadow:var(--shadow);
        }

        /* 联系表单 */
        .contact-section {
            background:var(--dark);
            color:#fff;
        }
        .contact-form {
            max-width:620px;
            margin:0 auto;
        }
        .form-row {
            margin-bottom:1.1rem;
        }
        .contact-form input,
        .contact-form textarea {
            width:100%;
            padding:13px;
            border-radius:7px;
            border:none;
            font-size:1rem;
        }

        /* 页脚 */
        footer {
            background:#081420;
            color:#c2c8d0;
            padding:2.8rem 0;
        }
        .footer-wrap {
            display:grid;
            grid-template-columns:2fr 1fr 1fr;
            gap:2rem;
        }
        .social-links {
            display:flex;
            gap:1rem;
            margin-top:1rem;
        }
        .social-links a {
            color:#fff;
            font-size:1.4rem;
            text-decoration:none;
        }

        /* ========= 移动端适配 ========= */
        @media(max-width:768px) {
            .hamburger {
                display:block;
            }
            .nav-links {
                position:absolute;
                left:0;
                top:66px;
                width:100%;
                background:#fff;
                flex-direction:column;
                padding:1.6rem;
                gap:1rem;
                box-shadow:0 8px 12px rgba(0,0,0,0.12);
                display:none;
            }
            .nav-links.active {
                display:flex;
            }
            .hero h1 {
                font-size:2rem;
            }
            .product-row {
                grid-template-columns:1fr;
            }
            .product-img-wrap img {
                min-height:240px;
            }
            .cases-grid {
                grid-template-columns:1fr;
            }
            .service-grid {
                grid-template-columns:1fr;
            }
            .footer-wrap {
                grid-template-columns:1fr;
            }
            section {
                padding:2.6rem 0;
            }
            .btn {
                width:100%;
                margin-bottom:12px;
            }
            .btn-outline {
                margin-left:0;
            }
        }
        @media(max-width:480px) {
            .section-title {
                font-size:1.6rem;
            }
            .product-text {
                padding:1.4rem;
            }
        }
    </style>
</head>
<body>
<header>
    <div class="container nav-wrap">
        <a href="#home" class="logo">KARY LITE</a>
        <button class="hamburger" id="menuBtn">☰</button>
        <nav class="nav-links" id="navMenu">
            <a href="#home" data-i18n="nav_home">Home</a>
            <a href="#products" data-i18n="nav_product">Products</a>
            <a href="#cases" data-i18n="nav_cases">Project Cases</a>
            <a href="#service" data-i18n="nav_service">After‑sales</a>
            <a href="#contact" data-i18n="nav_contact">Contact</a>
            <select class="lang-selector" id="langSelect">
                <option value="en">EN</option>
                <option value="de">DE</option>
                <option value="fr">FR</option>
                <option value="es">ES</option>
                <option value="it">IT</option>
            </select>
        </nav>
    </div>
</header>

<section id="home" class="hero">
    <div class="container">
        <h1 data-i18n="hero_title">Smart Full‑automatic Swimming Pool Robot</h1>
        <p data-i18n="hero_desc">Say goodbye to traditional cleaning. Intelligent, high‑efficiency pool robot for villa, hotel and commercial swimming pool.</p>
        <div>
            <a href="#products" class="btn" data-i18n="hero_btn1">Browse Products</a>
            <a href="#contact" class="btn btn-outline" data-i18n="hero_btn2">Request Quotation</a>
        </div>
    </div>
</section>

<section id="products">
    <div class="container">
        <h2 class="section-title" data-i18n="product_title">Our Product Series</h2>

        <!-- 1 无线智能泳池机器人 -->
        <div class="product-block">
            <div class="product-row">
                <div class="product-img-wrap">
                    <img src="https://placehold.co/700/0072bb/ffffff?text=Wireless+Pool+Robot" alt="Wireless Intelligent Swimming Pool Robot">
                </div>
                <div class="product-text">
                    <h3 data-i18n="prod_wireless_title">Wireless Intelligent Pool Robot</h3>
                    <p data-i18n="prod_wireless_intro">Free‑cable battery‑power robot, support wall‑climbing, water‑line cleaning. For residential and medium‑size commercial pools.</p>
                    <ul class="feature-list">
                        <li data-i18n="pw1">90° right‑angle / curved wall‑climbing</li>
                        <li data-i18n="pw2">IP68 full waterproof</li>
                        <li data-i18n="pw3">APP & Sonar intelligent path planning</li>
                        <li data-i18n="pw4">Models: SPR‑SHARK, SPR‑SEAL, SPR‑Crab, SPR200‑Lite, SPR‑Nezha1</li>
                    </ul>
                    <button class="spec-toggle" onclick="this.nextElementSibling.classList.toggle('open')" data-i18n="show_spec">Show Technical Specs</button>
                    <div class="spec-panel">
                        <div data-i18n="sp_wireless">
                            Applicable pool area: ≤400㎡<br>
                            Battery:7800‑10400mAh<br>
                            Working time: 2‑3.7h<br>
                            Filtration precision:180‑250μm<br>
                            Cleaning mode: Full‑coverage / Wall / Water‑line / Bottom
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2 有线控制泳池机器人 -->
        <div class="product-block">
            <div class="product-row">
                <div class="product-img-wrap">
                    <img src="https://placehold.co/700/005588/ffffff?text=Wired+Pool+Robot" alt="Wired‑controlled Intelligent Swimming Pool Robot">
                </div>
                <div class="product-text">
                    <h3 data-i18n="prod_wired_title">Wired‑controlled Pool Robot</h3>
                    <p data-i18n="prod_wired_intro">Floating power cable design, unlimited working time, heavy‑duty for large commercial swimming pool up to 1200㎡.</p>
                    <ul class="feature-list">
                        <li data-i18n="pr1">Continuous non‑stop cleaning</li>
                        <li data-i18n="pr2">High‑precision filtration down to 5μm</li>
                        <li data-i18n="pr3">Long floating cable:17‑25m</li>
                        <li data-i18n="pr4">Models:L317/L350/L340, C28, C36 series</li>
                    </ul>
                    <button class="spec-toggle" onclick="this.nextElementSibling.classList.toggle('open')" data-i18n="show_spec">Show Technical Specs</button>
                    <div class="spec-panel">
                        <div data-i18n="sp_wired">
                            Max applicable pool:1200㎡<br>
                            Output:DC24V safe voltage<br>
                            Filtration speed＞20m³/h<br>
                            IP68 waterproof, wall & water‑line cleaning
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--3 全自动水下吸污机 -->
        <div class="product-block">
            <div class="product-row">
                <div class="product-img-wrap">
                    <img src="https://placehold.co/700/1070aa/ffffff?text=Underwater+Suction+Cleaner" alt="Full‑automatic Underwater Suction Cleaner">
                </div>
                <div class="product-text">
                    <h3 data-i18n="prod_suction_title">Full‑automatic Underwater Suction Cleaner</h3>
                    <p data-i18n="prod_suction_intro">Light‑weight compact robot for small‑size family pool, focus on pool bottom vacuum cleaning.</p>
                    <ul class="feature-list">
                        <li data-i18n="ps1">Light‑weight body 3.66‑12.5kg</li>
                        <li data-i18n="ps2">Easy to carry and take out from pool</li>
                        <li data-i18n="ps3">Models:SPR013,SPR60,SPR70,SPR90</li>
                        <li data-i18n="ps4">Fit pool area:100‑200㎡</li>
                    </ul>
                    <button class="spec-toggle" onclick="this.nextElementSibling.classList.toggle('open')" data-i18n="show_spec">Show Technical Specs</button>
                    <div class="spec-panel">
                        <div data-i18n="sp_suction">
                            Working depth up to 2.5‑3m<br>
                            Battery:5000‑9000mAh<br>
                            Filtration precision:120‑200μm<br>
                            IP68 waterproof, no wall‑climbing function
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--4 水面吸叶收集器 -->
        <div class="product-block">
            <div class="product-row">
                <div class="product-img-wrap">
                    <img src="https://placehold.co/700/008099/ffffff?text=Surface+Leaf+Collector" alt="Surface Cleaning Leaf Collector">
                </div>
                <div class="product-text">
                    <h3 data-i18n="prod_surface_title">Surface Cleaning Leaf Collector</h3>
                    <p data-i18n="prod_surface_intro">Intelligent floating robot collect floating leaves and debris. Solar charging optional, for pool, lake and park water surface.</p>
                    <ul class="feature-list">
                        <li data-i18n="pz1">Automatic cruise on water surface</li>
                        <li data-i18n="pz2">Solar panel optional for long working hours</li>
                        <li data-i18n="pz3">Models:PL‑01,PL‑02,PL‑03</li>
                        <li data-i18n="pz4">Large‑capacity leaf collection bin</li>
                    </ul>
                    <button class="spec-toggle" onclick="this.nextElementSibling.classList.toggle('open')" data-i18n="show_spec">Show Technical Specs</button>
                    <div class="spec-panel">
                        <div data-i18n="sp_surface">
                            Waterproof:IPX7 / IPX8<br>
                            Battery:2500‑7800mAh<br>
                            Solar working time:12‑50h(depend on sunlight)<br>
                            Filtration precision:180‑400μm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ========== 项目案例板块 ========== -->
<section id="cases" class="cases-section">
    <div class="container">
        <h2 class="section-title" data-i18n="cases_title">Project Reference Cases</h2>
        <div class="cases-grid">
            <div class="case-card">
                <img src="https://placehold.co/600x230/105080/ffffff?text=Hotel+Resort+Pool+Project" alt="Hotel Resort Pool">
                <div class="case-content">
                    <h3 data-i18n="case1_title">Hotel & Resort Pool</h3>
                    <p data-i18n="case1_desc">Multiple wired pool robots deployed for resort outdoor swimming pools. Reduce manual maintenance cost, keep water crystal‑clear all tourist season.</p>
                </div>
            </div>
            <div class="case-card">
                <img src="https://placehold.co/600x230/006699/ffffff?text=Private+Villa+Pool" alt="Private Villa Pool">
                <div class="case-content">
                    <h3 data-i18n="case2_title">Luxury Private Villa Pool</h3>
                    <p data-i18n="case2_desc">Wireless robotic cleaner for residential villa pool, auto wall‑climbing, one‑click start, no cable trouble for home‑use scenario.</p>
                </div>
            </div>
            <div class="case-card">
                <img src="https://placehold.co/600x230/004477/ffffff?text=Public+Commercial+Pool" alt="Public Commercial Pool">
                <div class="case-content">
                    <h3 data-i18n="case3_title">Public & Community Pool</h3>
                    <p data-i18n="case3_desc">Heavy‑duty wired robot solution for large community public pool. Long‑time stable continuous operation for high‑frequency usage environment.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="service" class="service-section">
    <div class="container">
        <h2 class="section-title" data-i18n="service_title">After‑sales Support</h2>
        <div class="service-grid">
            <div class="service-item">
                <h4 data-i18n="s1_title">Free Technical Support</h4>
                <p data-i18n="s1_text">Installation guidance & technical document for global distributors.</p>
            </div>
            <div class="service-item">
                <h4 data-i18n="s2_title">24‑h Inquiry Response</h4>
                <p data-i18n="s2_text">Reply customer questions within 24 working hours.</p>
            </div>
            <div class="service-item">
                <h4 data-i18n="s3_title">Marketing Material Pack</h4>
                <p data-i18n="s3_text">Provide catalog, product images for your sales promotion.</p>
            </div>
        </div>
    </div>
</section>

<section id="contact" class="contact-section">
    <div class="container">
        <h2 class="section-title" data-i18n="contact_title">Contact Us</h2>
        <form class="contact-form">
            <div class="form-row">
                <input type="text" data-i18n-placeholder="form_name" placeholder="Your Name">
            </div>
            <div class="form-row">
                <input type="email" data-i18n-placeholder="form_email" placeholder="Your Email">
            </div>
            <div class="form-row">
                <textarea rows="5" data-i18n-placeholder="form_msg" placeholder="Your message, pool size, quantity requirement"></textarea>
            </div>
            <button class="btn" type="submit" data-i18n="form_submit">Send Inquiry</button>
        </form>
    </div>
</section>

<footer>
    <div class="container footer-wrap">
        <div>
            <h3>KARY LITE</h3>
            <p data-i18n="footer_text">Professional manufacturer of automatic swimming pool cleaning robot. Support OEM & ODM, global wholesale & distribution cooperation welcome.</p>
            <div class="social-links">
                <a href="https://instagram.com" target="_blank" title="Instagram">INS</a>
                <a href="https://facebook.com" target="_blank" title="Facebook">FB</a>
                <a href="https://linkedin.com" target="_blank" title="LinkedIn">LinkedIn</a>
                <a href="https://youtube.com" target="_blank" title="YouTube">YT</a>
            </div>
        </div>
        <div>
            <h4 data-i18n="footer_quick">Quick Links</h4>
            <p><a href="#products" style="color:#c2c8d0;text-decoration:none" data-i18n="nav_product">Products</a></p>
            <p><a href="#cases" style="color:#c2c8d0;text-decoration:none" data-i18n="nav_cases">Project Cases</a></p>
            <p><a href="#service" style="color:#c2c8d0;text-decoration:none" data-i18n="nav_service">After‑sales</a></p>
        </div>
        <div>
            <h4 data-i18n="footer_contact">Contact</h4>
            <p>sales@karylite‑poolrobot.com</p>
        </div>
    </div>
</footer>

<script>
// 汉堡导航
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click',()=>{
    navMenu.classList.toggle('active');
})
// 点击导航链接自动关闭移动端菜单
document.querySelectorAll("#navMenu a").forEach(link=>{
    link.addEventListener('click',()=>{
        if(window.innerWidth <=768) navMenu.classList.remove('active');
    })
})

//多语言字典
const i18nData = {
    en:{
        nav_home:"Home",nav_product:"Products",nav_cases:"Project Cases",nav_service:"After‑sales",nav_contact:"Contact",
        hero_title:"Smart Full‑automatic Swimming Pool Robot",
        hero_desc:"Say goodbye to traditional cleaning. Intelligent, high‑efficiency pool robot for villa, hotel and commercial swimming pool.",
        hero_btn1:"Browse Products",hero_btn2:"Request Quotation",
        product_title:"Our Product Series",
        prod_wireless_title:"Wireless Intelligent Pool Robot",
        prod_wireless_intro:"Free‑cable battery‑power robot, support wall‑climbing, water‑line cleaning. For residential and medium‑size commercial pools.",
        pw1:"90° right‑angle / curved wall‑climbing",pw2:"IP68 full waterproof",pw3:"APP & Sonar intelligent path planning",pw4:"Models: SPR‑SHARK, SPR‑SEAL, SPR‑Crab, SPR200‑Lite, SPR‑Nezha1",
        prod_wired_title:"Wired‑controlled Pool Robot",
        prod_wired_intro:"Floating power cable design, unlimited working time, heavy‑duty for large commercial swimming pool up to 1200㎡.",
        pr1:"Continuous non‑stop cleaning",pr2:"High‑precision filtration down to 5μm",pr3:"Long floating cable:17‑25m",pr4:"Models:L317/L350/L340, C28, C36 series",
        prod_suction_title:"Full‑automatic Underwater Suction Cleaner",
        prod_suction_intro:"Light‑weight compact robot for small‑size family pool, focus on pool bottom vacuum cleaning.",
        ps1:"Light‑weight body 3.66‑12.5kg",ps2:"Easy to carry and take out from pool",ps3:"Models:SPR013,SPR60,SPR70,SPR90",ps4:"Fit pool area:100‑200㎡",
        prod_surface_title:"Surface Cleaning Leaf Collector",
        prod_surface_intro:"Intelligent floating robot collect floating leaves and debris. Solar charging optional, for pool, lake and park water surface.",
        pz1:"Automatic cruise on water surface",pz2:"Solar panel optional for long working hours",pz3:"Models:PL‑01,PL‑02,PL‑03",pz4:"Large‑capacity leaf collection bin",
        show_spec:"Show Technical Specs",
        sp_wireless:"Applicable pool area: ≤400㎡<br>Battery:7800‑10400mAh<br>Working time: 2‑3.7h<br>Filtration precision:180‑250μm<br>Cleaning mode: Full‑coverage / Wall / Water‑line / Bottom",
        sp_wired:"Max applicable pool:1200㎡<br>Output:DC24V safe voltage<br>Filtration speed＞20m³/h<br>IP68 waterproof, wall & water‑line cleaning",
        sp_suction:"Working depth up to 2.5‑3m<br>Battery:5000‑9000mAh<br>Filtration precision:120‑200μm<br>IP68 waterproof, no wall‑climbing function",
        sp_surface:"Waterproof:IPX7 / IPX8<br>Battery:2500‑7800mAh<br>Solar working time:12‑50h(depend on sunlight)<br>Filtration precision:180‑400μm",
        cases_title:"Project Reference Cases",
        case1_title:"Hotel & Resort Pool",
        case1_desc:"Multiple wired pool robots deployed for resort outdoor swimming pools. Reduce manual maintenance cost, keep water crystal‑clear all tourist season.",
        case2_title:"Luxury Private Villa Pool",
        case2_desc:"Wireless robotic cleaner for residential villa pool, auto wall‑climbing, one‑click start, no cable trouble for home‑use scenario.",
        case3_title:"Public & Community Pool",
        case3_desc:"Heavy‑duty wired robot solution for large community public pool. Long‑time stable continuous operation for high‑frequency usage environment.",
        service_title:"After‑sales Support",
        s1_title:"Free Technical Support",s1_text:"Installation guidance & technical document for global distributors.",
        s2_title:"24‑h Inquiry Response",s2_text:"Reply customer questions within 24 working hours.",
        s3_title:"Marketing Material Pack",s3_text:"Provide catalog, product images for your sales promotion.",
        contact_title:"Contact Us",
        form_name:"Your Name",form_email:"Your Email",form_msg:"Your message, pool size, quantity requirement",form_submit:"Send Inquiry",
        footer_text:"Professional manufacturer of automatic swimming pool cleaning robot. Support OEM & ODM, global wholesale & distribution cooperation welcome.",
        footer_quick:"Quick Links",footer_contact:"Contact"
    },
    de:{
        nav_home:"Startseite",nav_product:"Produkte",nav_cases:"Projektbeispiele",nav_service:"Kundendienst",nav_contact:"Kontakt",
        hero_title:"Vollautomatischer intelligenter Schwimmbad‑Roboter",
        hero_desc:"Verabschieden Sie sich von traditioneller Reinigung. Intelligenter, leistungsstarker Roboter für Villen, Hotels und gewerbliche Schwimmbäder.",
        hero_btn1:"Produkte ansehen",hero_btn2:"Angebot anfragen",
        product_title:"Unsere Produktreihen",
        prod_wireless_title:"Kabelloser intelligenter Schwimmbadroboter",
        prod_wireless_intro:"Akku‑betriebener Roboter ohne Kabel, Wandkletter‑ und Wasserlinien‑Reinigung. Für private und mittlere gewerbliche Becken.",
        pw1:"90°‑Rechtwinkel‑ / Kurven‑Wandklettern",pw2:"Vollständig wasserdicht IP68",pw3:"APP & Sonar intelligente Wegplanung",pw4:"Modelle: SPR‑SHARK, SPR‑SEAL, SPR‑Crab, SPR200‑Lite, SPR‑Nezha1",
        prod_wired_title:"Kabelgebundener Schwimmbadroboter",
        prod_wired_intro:"Schwimmendes Versorgungskabel, unbegrenzte Arbeitszeit, robust für gewerbliche Becken bis 1200㎡.",
        pr1:"Dauerbetrieb ohne Unterbrechung",pr2:"Hochgenaue Filterung bis 5μm",pr3:"Langes schwimmendes Kabel:17‑25m",pr4:"Modelle:L317/L350/L340, C28, C36‑Serie",
        prod_suction_title:"Vollautomatischer Unterwasser‑Saugreiniger",
        prod_suction_intro:"Leichter kompakter Roboter für kleine private Becken, spezialisiert auf Bodenreinigung.",
        ps1:"Leichtgewicht 3,66‑12,5kg",ps2:"Einfach herauszunehmen aus dem Becken",ps3:"Modelle:SPR013,SPR60,SPR70,SPR90",ps4:"Geeignet für 100‑200㎡ Becken",
        prod_surface_title:"Oberflächen‑Blattsammler",
        prod_surface_intro:"Intelligenter schwimmender Roboter sammelt Blätter und Treibgut. Optionale Solaraufladung für Becken, Seen und Parkgewässer.",
        pz1:"Automatische Fahrt auf Wasseroberfläche",pz2:"Optionales Solarpanel für lange Laufzeit",pz3:"Modelle:PL‑01,PL‑02,PL‑03",pz4:"Großer Schmutzbehälter",
        show_spec:"Technische Daten anzeigen",
        sp_wireless:"Geeignete Beckenfläche: ≤400㎡<br>Akku:7800‑10400mAh<br>Arbeitszeit: 2‑3,7h<br>Filtergenauigkeit:180‑250μm<br>Reinigungsmodus: Voll / Wand / Wasserlinie / Boden",
        sp_wired:"Max. Beckengröße:1200㎡<br>Ausgang:DC24V Sicherheitsspannung<br>Filterleistung＞20m³/h<br>IP68 wasserdicht, Wand‑ und Wasserlinienreinigung",
        sp_suction:"Einsatztiefe bis 2,5‑3m<br>Akku:5000‑9000mAh<br>Filtergenauigkeit:120‑200μm<br>IP68 wasserdicht, keine Wandkletterfunktion",
        sp_surface:"Schutzklasse:IPX7 / IPX8<br>Akku:2500‑7800mAh<br>Solar‑Laufzeit:12‑50h (je nach Sonneneinstrahlung)<br>Filtergenauigkeit:180‑400μm",
        cases_title:"Projekt Referenzbeispiele",
        case1_title:"Hotel‑ und Resort‑Becken",
        case1_desc:"Mehrere kabelgebundene Roboter für Resort‑Außenbecken installiert. Reduziert Wartungspersonal, sauberes Wasser während der gesamten Saison.",
        case2_title:"Luxus‑Villenbecken",
        case2_desc:"Kabelloser Reinigungsroboter für Villen, automatische Wandkletterfunktion, Ein‑Knopf‑Start, ohne Kabelbelastung im Hausgebrauch.",
        case3_title:"Öffentliche Gemeinschaftsbecken",
        case3_desc:"Robuste kabelgebundene Lösung für große öffentliche Becken. Stabiler Langzeitbetrieb bei hoher Nutzung.",
        service_title:"Kundendienst‑Unterstützung",
        s1_title:"Kostenlose technische Unterstützung",s1_text:"Installationsanleitung und technische Dokumente für globale Händler.",
        s2_title:"24‑Stunden‑Anfrageantwort",s2_text:"Antwort auf Kundenfragen innerhalb von 24 Arbeitsstunden.",
        s3_title:"Marketing‑Materialpaket",s3_text:"Katalog und Produktbilder für Ihre Verkaufsförderung.",
        contact_title:"Kontaktieren Sie uns",
        form_name:"Ihr Name",form_email:"Ihre E‑Mail",form_msg:"Ihre Nachricht, Beckengröße, gewünschte Menge",form_submit:"Anfrage senden",
        footer_text:"Professioneller Hersteller von automatischen Schwimmbadreinigungsrobotern. OEM & ODM möglich, weltweiter Großhandel und Vertriebspartnerschaften willkommen.",
        footer_quick:"Schnellzugriff",footer_contact:"Kontakt"
    },
    fr:{
        nav_home:"Accueil",nav_product:"Produits",nav_cases:"Projets Réalisés",nav_service:"SAV",nav_contact:"Contact",
        hero_title:"Robot nettoyeur de piscine entièrement automatique",
        hero_desc:"Adieu au nettoyage manuel traditionnel. Robot intelligent et performant pour villas, hôtels et piscines commerciales.",
        hero_btn1:"Voir produits",hero_btn2:"Demander devis",
        product_title:"Nos gammes de produits",
        prod_wireless_title:"Robot de piscine intelligent sans fil",
        prod_wireless_intro:"Robot sur batterie sans câble, nettoyage des parois et de la ligne d'eau. Pour piscines résidentielles et moyennes piscines professionnelles.",
        pw1:"Escalade paroi 90° droite / courbe",pw2:"Étanche IP68 complet",pw3:"Planification intelligente APP & sonar",pw4:"Modèles: SPR‑SHARK, SPR‑SEAL, SPR‑Crab, SPR200‑Lite, SPR‑Nezha1",
        prod_wired_title:"Robot de piscine à commande filaire",
        prod_wired_intro:"Câble d'alimentation flottant, temps de travail illimité, robuste pour piscine commerciale jusqu'à 1200㎡.",
        pr1:"Nettoyage continu sans arrêt",pr2:"Filtrage haute précision jusqu'à 5μm",pr3:"Long câble flottant:17‑25m",pr4:"Modèles:L317/L350/L340, C28, série C36",
        prod_suction_title:"Aspirateur sous‑marine entièrement automatique",
        prod_suction_intro:"Robot compact léger pour petite piscine familiale, spécialisé sur le nettoyage du fond.",
        ps1:"Poids léger 3,66‑12,5kg",ps2:"Facile à sortir de la piscine",ps3:"Modèles:SPR013,SPR60,SPR70,SPR90",ps4:"Convient pour piscine 100‑200㎡",
        prod_surface_title:"Collecteur de feuilles pour surface de piscine",
        prod_surface_intro:"Robot flottant intelligent ramassant feuilles et débris. Option panneau solaire, adapté piscine, lac et plans d'eau parc.",
        pz1:"Circulation automatique sur la surface",pz2:"Panneau solaire optionnel pour grande autonomie",pz3:"Modèles:PL‑01,PL‑02,PL‑03",pz4:"Grand bac de collecte des feuilles",
        show_spec:"Afficher caractéristiques techniques",
        sp_wireless:"Surface piscine max: ≤400㎡<br>Batterie:7800‑10400mAh<br>Temps de travail: 2‑3,7h<br>Précision filtre:180‑250μm<br>Mode: Complet / Paroi / Ligne d'eau / Fond",
        sp_wired:"Surface max:1200㎡<br>Sortie tension sécurisée DC24V<br>Débit filtration＞20m³/h<br>IP68 étanche, nettoyage paroi & ligne d'eau",
        sp_suction:"Profondeur travail 2,5‑3m<br>Batterie:5000‑9000mAh<br>Précision filtre:120‑200μm<br>IP68 étanche, sans fonction escalade paroi",
        sp_surface:"Étanchéité:IPX7 / IPX8<br>Batterie:2500‑7800mAh<br>Autonomie solaire:12‑50h (selon ensoleillement)<br>Précision filtre:180‑400μm",
        cases_title:"Cas de projets réalisés",
        case1_title:"Piscine hôtel & resort",
        case1_desc:"Plusieurs robots filaires installés sur piscines extérieures de resort. Réduit le personnel d'entretien, maintient l'eau cristalline toute saison touristique.",
        case2_title:"Piscine villa de luxe",
        case2_desc:"Robot sans fil pour villa privée, escalade parois automatique, démarrage un clic, sans gêne de câble pour usage domestique.",
        case3_title:"Piscine publique et communautaire",
        case3_desc:"Solution robot filaire robuste pour grande piscine publique. Fonctionnement stable longue durée pour forte fréquence d'utilisation.",
        service_title:"Support après‑vente",
        s1_title:"Support technique gratuit",s1_text:"Guide installation et documents techniques pour distributeurs mondiaux.",
        s2_title:"Réponse demande sous 24h",s2_text:"Réponse aux demandes client dans les 24 heures ouvrées.",
        s3_title:"Pack matériel marketing",s3_text:"Catalogue et images produits pour votre promotion commerciale.",
        contact_title:"Contactez‑nous",
        form_name:"Votre nom",form_email:"Votre email",form_msg:"Votre message, surface piscine, quantité souhaitée",form_submit:"Envoyer la demande",
        footer_text:"Fabricant professionnel robot nettoyeur piscine automatique. Possibilité OEM & ODM, bienvenue grossistes et partenaires distribution mondiaux.",
        footer_quick:"Liens rapides",footer_contact:"Contact"
    },
    es:{
        nav_home:"Inicio",nav_product:"Productos",nav_cases:"Casos de Proyectos",nav_service:"Servicio Postventa",nav_contact:"Contacto",
        hero_title:"Robot limpiador de piscina totalmente automático inteligente",
        hero_desc:"Despídase de la limpieza manual tradicional. Robot inteligente y alto rendimiento para villas, hoteles y piscinas comerciales.",
        hero_btn1:"Ver productos",hero_btn2:"Solicitar presupuesto",
        product_title:"Nuestras series de productos",
        prod_wireless_title:"Robot inteligente inalámbrico para piscina",
        prod_wireless_intro:"Robot a batería sin cable, limpieza de paredes y línea de agua. Para piscinas residenciales y medianas comerciales.",
        pw1:"Escalada pared 90° recta / curva",pw2:"Impermeabilidad completa IP68",pw3:"Planificación inteligente APP y sonar",pw4:"Modelos: SPR‑SHARK, SPR‑SEAL, SPR‑Crab, SPR200‑Lite, SPR‑Nezha1",
        prod_wired_title:"Robot de piscina con control por cable",
        prod_wired_intro:"Cable de alimentación flotante, tiempo de trabajo ilimitado, resistente para piscinas comerciales hasta 1200㎡.",
        pr1:"Limpieza continua sin paradas",pr2:"Filtración alta precisión hasta 5μm",pr3:"Cable flotante largo:17‑25m",pr4:"Modelos:L317/L350/L340, C28, serie C36",
        prod_suction_title:"Aspirador submarino totalmente automático",
        prod_suction_intro:"Robot compacto ligero para piscinas familiares pequeñas, centrado en limpieza de fondo.",
        ps1:"Peso ligero 3,66‑12,5kg",ps2:"Fácil extraer de la piscina",ps3:"Modelos:SPR013,SPR60,SPR70,SPR90",ps4:"Apto para piscinas 100‑200㎡",
        prod_surface_title:"Colector de hojas para superficie de piscina",
        prod_surface_intro:"Robot flotante inteligente recoge hojas y residuos. Panel solar opcional, para piscinas, lagos y superficies de parques.",
        pz1:"Navegación automática por la superficie",pz2:"Panel solar opcional para larga autonomía",pz3:"Modelos:PL‑01,PL‑02,PL‑03",pz4:"Gran depósito recolector de hojas",
        show_spec:"Mostrar especificaciones técnicas",
        sp_wireless:"Área piscina ≤400㎡<br>Batería:7800‑10400mAh<br>Tiempo trabajo: 2‑3,7h<br>Precisión filtro:180‑250μm<br>Modos: Completo / Pared / Línea agua / Fondo",
        sp_wired:"Máx piscina:1200㎡<br>Tensión salida segura DC24V<br>Caudal filtro＞20m³/h<br>IP68 impermeable, limpieza pared y línea agua",
        sp_suction:"Profundidad trabajo 2,5‑3m<br>Batería:5000‑9000mAh<br>Precisión filtro:120‑200μm<br>IP68 impermeable, sin función escalar paredes",
        sp_surface:"Grado impermeabilidad:IPX7 / IPX8<br>Batería:2500‑7800mAh<br>Autonomía solar:12‑50h (según luz solar)<br>Precisión filtro:180‑400μm",
        cases_title:"Casos de proyectos de referencia",
        case1_title:"Piscinas hotel y resort",
        case1_desc:"Varios robots con cable instalados en piscinas exteriores de resort. Reduce personal mantenimiento, mantiene agua cristalina toda temporada turística.",
        case2_title:"Piscina villa de lujo",
        case2_desc:"Robot inalámbrico para villa privada, escalada automática de paredes, arranque con un botón, sin molestias de cable para uso doméstico.",
        case3_title:"Piscina pública y comunitaria",
        case3_desc:"Solución de robot cable resistente para grandes piscinas públicas. Funcionamiento estable a largo plazo para uso intensivo.",
        service_title:"Soporte postventa",
        s1_title:"Soporte técnico gratuito",s1_text:"Guía instalación y documentos técnicos para distribuidores globales.",
        s2_title:"Respuesta consulta en 24h",s2_text:"Respuesta a consultas cliente en 24 horas hábiles.",
        s3_title:"Paquete materiales marketing",s3_text:"Catálogo e imágenes producto para su promoción comercial.",
        contact_title:"Contáctenos",
        form_name:"Su nombre",form_email:"Su correo electrónico",form_msg:"Su mensaje, tamaño piscina, cantidad requerida",form_submit:"Enviar consulta",
        footer_text:"Fabricante profesional de robots limpiadores automáticos para piscinas. OEM y ODM disponibles, bienvenidos mayoristas y socios distribución globales.",
        footer_quick:"Enlaces rápidos",footer_contact:"Contacto"
    },
    it:{
        nav_home:"Home",nav_product:"Prodotti",nav_cases:"Casi di Progetto",nav_service:"Servizio Post‑vendita",nav_contact:"Contatti",
        hero_title:"Robot pulitore piscina completamente automatico intelligente",
        hero_desc:"Dite addio alla pulizia manuale tradizionale. Robot intelligente ad alte prestazioni per ville, hotel e piscine commerciali.",
        hero_btn1:"Vedi prodotti",hero_btn2:"Richiedi preventivo",
        product_title:"Le nostre linee prodotto",
        prod_wireless_title:"Robot piscina intelligente wireless",
        prod_wireless_intro:"Robot a batteria senza cavo, pulizia pareti e linea d'acqua. Per piscine residenziali e medie piscine professionali.",
        pw1:"Scalata parete 90° dritta / curva",pw2:"Impermeabilità totale IP68",pw3:"Pianificazione intelligente APP e sonar",pw4:"Modelli: SPR‑SHARK, SPR‑SEAL, SPR‑Crab, SPR200‑Lite, SPR‑Nezha1",
        prod_wired_title:"Robot piscina comandato con cavo",
        prod_wired_intro:"Cavo di alimentazione galleggiante, tempo di funzionamento illimitato, robusto per piscine commerciali fino a 1200㎡.",
        pr1:"Pulizia continua senza interruzioni",pr2:"Filtrazione alta precisione fino a 5μm",pr3:"Cavo galleggiante lungo:17‑25m",pr4:"Modelli:L317/L350/L340, C28, serie C36",
        prod_suction_title:"Aspiratore subacqueo completamente automatico",
        prod_suction_intro:"Robot compatto leggero per piccole piscine domestiche, focalizzato sulla pulizia del fondo.",
        ps1:"Peso leggero 3,66‑12,5kg",ps2:"Facile da estrarre dalla piscina",ps3:"Modelli:SPR013,SPR60,SPR70,SPR90",ps4:"Adatto per piscine 100‑200㎡",
        prod_surface_title:"Raccogli foglie per superficie acquatica",
        prod_surface_intro:"Robot galleggiante intelligente raccoglie foglie e detriti. Pannello solare opzionale, per piscine, laghi e specchi d'acqua parco.",
        pz1:"Navigazione automatica sulla superficie",pz2:"Pannello solare opzionale per lunga autonomia",pz3:"Modelli:PL‑01,PL‑02,PL‑03",pz4:"Grande contenitore raccogli foglie",
        show_spec:"Mostra specifiche tecniche",
        sp_wireless:"Superficie piscina ≤400㎡<br>Batteria:7800‑10400mAh<br>Tempo funzionamento: 2‑3,7h<br>Precisione filtro:180‑250μm<br>Modalità: Completa / Parete / Linea acqua / Fondo",
        sp_wired:"Massima piscina:1200㎡<br>Tensione uscita sicura DC24V<br>Portata filtro＞20m³/h<br>IP68 impermeabile, pulizia parete e linea acqua",
        sp_suction:"Profondità lavoro 2,5‑3m<br>Batteria:5000‑9000mAh<br>Precisione filtro:120‑200μm<br>IP68 impermeabile, senza funzione scalata pareti",
        sp_surface:"Grado impermeabilità:IPX7 / IPX8<br>Batteria:2500‑7800mAh<br>Autonomia solare:12‑50h (dipende da sole)<br>Precisione filtro:180‑400μm",
        cases_title:"Casi di progetto di riferimento",
        case1_title:"Piscine hotel e resort",
        case1_desc:"Diversi robot con cavo installati nelle piscine esterne del resort. Riduce personale di manutenzione, mantiene acqua cristallina per tutta la stagione turistica.",
        case2_title:"Piscina villa di lusso",
        case2_desc:"Robot wireless per villa privata, scalata automatica pareti, avvio con un pulsante, senza fastidiosi cavi per uso domestico.",
        case3_title:"Piscina pubblica e comunitaria",
        case3_desc:"Soluzione robot cablato robusto per grandi piscine pubbliche. Funzionamento stabile a lungo termine per utilizzo ad alta frequenza.",
        service_title:"Supporto post‑vendita",
        s1_title:"Supporto tecnico gratuito",s1_text:"Guida installazione e documenti tecnici per distributori globali.",
        s2_title:"Risposta richiesta entro 24h",s2_text:"Risposta alle richieste cliente entro 24 ore lavorative.",
        s3_title:"Pacchetto materiale marketing",s3_text:"Catalogo e immagini prodotto per la vostra promozione commerciale.",
        contact_title:"Contattaci",
        form_name:"Il tuo nome",form_email:"La tua email",form_msg:"Il tuo messaggio, dimensione piscina, quantità richiesta",form_submit:"Invia richiesta",
        footer_text:"Produttore professionale robot pulitori automatici piscina. OEM e ODM disponibili, benvenuti grossisti e partner distribuzione mondiali.",
        footer_quick:"Collegamenti veloci",footer_contact:"Contatti"
    }
};

//切换语言
const langSelect = document.getElementById("langSelect");
function renderLang(lang){
    const dict = i18nData[lang];
    document.querySelectorAll("[data‑i18n]").forEach(el=>{
        const k = el.getAttribute("data‑i18n");
        el.innerHTML = dict[k];
    })
    document.querySelectorAll("[data‑i18n‑placeholder]").forEach(el=>{
        const k = el.getAttribute("data‑i18n‑placeholder");
        el.placeholder = dict[k];
    })
}
langSelect.addEventListener("change",e=>renderLang(e.target.value));
renderLang("en");
</script>
</body>
</html>
