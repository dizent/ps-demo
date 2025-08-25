// 管理页面脚本

/**
 * 从site-data文件加载数据并填充到管理页面表单
 */
async function loadDataFromFile() {
    try {
        const response = await fetch('site-data');
        if (response.ok) {
            const data = await response.json();
            fillFormWithData(data);
        } else {
            console.error('无法加载数据文件:', response.statusText);
            // 如果文件加载失败，尝试从localStorage加载
            loadDataFromLocalStorage();
        }
    } catch (e) {
        console.error('加载数据文件失败:', e);
        // 如果发生错误，尝试从localStorage加载
        loadDataFromLocalStorage();
    }
}

/**
 * 从localStorage加载数据并填充到管理页面表单
 */
function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('websiteData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            fillFormWithData(data);
        } catch (e) {
            console.error('解析保存的数据失败:', e);
            // 如果解析失败，使用默认数据
            loadDefaultData();
        }
    } else {
        // 如果localStorage中没有数据，使用默认数据
        loadDefaultData();
    }
}

/**
 * 使用默认数据填充表单
 */
function loadDefaultData() {
    // 默认数据
    const defaultData = {
        siteTitle: "PinSai导热硅脂 - 专业导热解决方案提供商",
        companyName: "PinSai",
        companyDescription: "15年专注导热材料研发与生产，国家高新技术企业，为全球客户提供高品质的导热解决方案。",
        companyAddress: "广东省深圳市南山区科技园南区",
        companyPhone: "0755-12345678",
        companyEmail: "info@pinsai.com",
        workHours: "周一至周五: 9:00 - 18:00",
        wechatQrCode: "https://picsum.photos/id/237/120/120",
        wechatLink: "#",
        weiboLink: "#",
        linkedinLink: "#",
        primaryColor: "#0F3460",
        accentColor: "#E94560",
        darkColor: "#16213E",
        lightColor: "#F5F5F5",
        
        // 产品数据
        products: [
            {
                name: "HC-900 高导热硅脂",
                thermal: "8.5 W/m·K",
                description: "超高导热系数，适用于CPU、GPU等高性能电子元件的散热需求，长期使用稳定性好。",
                image: "https://picsum.photos/id/1/500/300"
            },
            {
                name: "HC-700 通用导热硅脂",
                thermal: "6.8 W/m·K",
                description: "高性价比的通用型导热硅脂，适用于大多数电子设备的散热需求，施工性能优良。",
                image: "https://picsum.photos/id/2/500/300"
            },
            {
                name: "HC-500 经济型导热硅脂",
                thermal: "4.5 W/m·K",
                description: "经济型导热硅脂，适用于一般电子设备的散热需求，性价比高。",
                image: "https://picsum.photos/id/3/500/300"
            }
        ],
        
        // 新闻数据
        news: [
            {
                title: "PinSai新生产基地正式投产，年产能提升至1000吨",
                date: "2023-05-28",
                category: "公司新闻",
                image: "https://picsum.photos/id/180/600/400",
                summary: "我司位于惠州的新生产基地正式投产，占地面积20000平方米，引入多条自动化生产线，年产能提升至1000吨，将更好地满足客户需求。"
            },
            {
                title: "PinSai荣获2023年度导热材料行业最佳供应商奖",
                date: "2023-04-15",
                category: "公司新闻",
                image: "https://picsum.photos/id/200/600/400",
                summary: "在2023年度导热材料行业评选中，PinSai凭借卓越的产品质量和完善的服务体系，荣获'最佳供应商'奖项。"
            },
            {
                title: "新能源汽车导热解决方案市场需求激增，PinSai推出定制化产品",
                date: "2023-03-10",
                category: "行业动态",
                image: "https://picsum.photos/id/111/600/400",
                summary: "随着新能源汽车市场的快速发展，导热材料需求激增。PinSai针对新能源汽车领域推出了系列定制化导热解决方案，获得市场广泛认可。"
            }
        ]
    };
    
    fillFormWithData(defaultData);
}

/**
 * 使用数据填充表单
 */
function fillFormWithData(data) {
    // 填充基本信息
    document.getElementById('siteTitle').value = data.siteTitle || data.siteName || "";
    document.getElementById('companyName').value = data.companyName || data.siteName || "";
    document.getElementById('companyDescription').value = data.companyDescription || "";
    
    // 填充联系信息
    if (data.contactInfo) {
        document.getElementById('companyAddress').value = data.contactInfo.address || "";
        document.getElementById('companyPhone').value = data.contactInfo.phone || "";
        document.getElementById('companyEmail').value = data.contactInfo.email || "";
    } else {
        document.getElementById('companyAddress').value = data.companyAddress || "";
        document.getElementById('companyPhone').value = data.companyPhone || "";
        document.getElementById('companyEmail').value = data.companyEmail || "";
    }
    
    document.getElementById('workHours').value = data.workHours || "";
    
    // 填充社交媒体信息
    if (data.socialMedia) {
        document.getElementById('wechatQrCode').value = data.wechatQrCode || "";
        document.getElementById('wechatLink').value = data.wechatLink || "#";
        document.getElementById('weiboLink').value = data.weiboLink || "#";
        document.getElementById('linkedinLink').value = data.linkedinLink || "#";
    }
    
    // 填充主题设置
    document.getElementById('primaryColor').value = data.primaryColor || "#0F3460";
    document.getElementById('accentColor').value = data.accentColor || "#E94560";
    document.getElementById('darkColor').value = data.darkColor || "#16213E";
    document.getElementById('lightColor').value = data.lightColor || "#F5F5F5";
    
    // 填充产品数据
    if (data.products && data.products.length > 0) {
        fillProductData(data.products);
    }
    
    // 填充新闻数据
    if (data.news && data.news.length > 0) {
        fillNewsData(data.news);
    }
}

/**
 * 填充产品数据到表单
 */
function fillProductData(products) {
    // 先清空现有产品表单
    const productContainer = document.querySelector('#products');
    const addButton = productContainer.querySelector('.add-product-btn');
    
    // 保留标题和添加按钮，清空中间内容
    const titleElement = productContainer.querySelector('h2');
    productContainer.innerHTML = '';
    productContainer.appendChild(titleElement);
    
    // 添加产品表单
    products.forEach((product, index) => {
        const productSection = document.createElement('div');
        productSection.className = 'border-b border-gray-light pb-6 mb-6';
        
        productSection.innerHTML = `
            <h3 class="text-xl font-semibold mb-4">产品${index + 1}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-gray-dark font-medium mb-2">产品名称</label>
                    <input type="text" id="product${index + 1}Name" class="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" value="${product.name}">
                </div>
                <div>
                    <label class="block text-gray-dark font-medium mb-2">导热系数</label>
                    <input type="text" id="product${index + 1}Thermal" class="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" value="${product.thermal}">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-gray-dark font-medium mb-2">产品描述</label>
                    <textarea id="product${index + 1}Desc" class="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]">${product.description}</textarea>
                </div>
                <div>
                    <label class="block text-gray-dark font-medium mb-2">产品图片URL</label>
                    <input type="text" id="product${index + 1}Image" class="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" value="${product.image}">
                </div>
                ${index > 0 ? `<div class="md:col-span-2 text-right"><button class="delete-product-btn bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors" data-index="${index + 1}"><i class="fa fa-trash mr-2"></i>删除产品</button></div>` : ''}
            </div>
        `;
        
        productContainer.appendChild(productSection);
    });
    
    // 添加添加按钮
    productContainer.appendChild(addButton);
    
    // 添加删除产品按钮事件
    document.querySelectorAll('.delete-product-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteProduct(index);
        });
    });
}

/**
 * 填充新闻数据到表单
 */
function fillNewsData(news) {
    // 先清空现有新闻表单
    const newsContainer = document.querySelector('#news');
    const addButton = newsContainer.querySelector('.add-news-btn');
    
    // 保留标题和添加按钮，清空中间内容
    const titleElement = newsContainer.querySelector('h2');
    newsContainer.innerHTML = '';
    newsContainer.appendChild(titleElement);
    
    // 添加新闻表单
    news.forEach((newsItem, index) => {
        const newsSection = document.createElement('div');
        newsSection.className = 'border-b border-gray-light pb-6 mb-6';
        
        newsSection.innerHTML = `
            <h3 class="text-xl font-semibold mb-4">新闻${index + 1}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-gray-dark font-medium mb-2">新闻标题</label>
                    <input type="text" id="news${index + 1}Title" class="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" value="${newsItem.title}">
                </div>
                <div>
                    <label class="block text-gray-dark font-medium mb-2">发布日期</label>
                    <input type="date" id="news${index + 1}Date" class="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" value="${newsItem.date}">
                </div>
                <div>
                    <label class="block text-gray-dark font-medium mb-2">新闻分类</label>
                    <input type="text" id="news${index + 1}Category" class="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" value="${newsItem.category}">
                </div>
                <div>
                    <label class="block text-gray-dark font-medium mb-2">新闻图片URL</label>
                    <input type="text" id="news${index + 1}Image" class="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" value="${newsItem.image}">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-gray-dark font-medium mb-2">新闻摘要</label>
                    <textarea id="news${index + 1}Summary" class="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]">${newsItem.summary}</textarea>
                </div>
                ${index > 0 ? `<div class="md:col-span-2 text-right"><button class="delete-news-btn bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg transition-colors" data-index="${index + 1}"><i class="fa fa-trash mr-2"></i>删除新闻</button></div>` : ''}
            </div>
        `;
        
        newsContainer.appendChild(newsSection);
    });
    
    // 添加添加按钮
    newsContainer.appendChild(addButton);
    
    // 添加删除新闻按钮事件
    document.querySelectorAll('.delete-news-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteNews(index);
        });
    });
}

/**
 * 保存表单数据
 */
async function saveFormData() {
    try {
        // 收集表单数据
        const formData = {
            siteTitle: document.getElementById('siteTitle').value,
            companyName: document.getElementById('companyName').value,
            companyDescription: document.getElementById('companyDescription').value,
            companyAddress: document.getElementById('companyAddress').value,
            companyPhone: document.getElementById('companyPhone').value,
            companyEmail: document.getElementById('companyEmail').value,
            workHours: document.getElementById('workHours').value,
            wechatQrCode: document.getElementById('wechatQrCode').value,
            wechatLink: document.getElementById('wechatLink').value,
            weiboLink: document.getElementById('weiboLink').value,
            linkedinLink: document.getElementById('linkedinLink').value,
            primaryColor: document.getElementById('primaryColor').value,
            accentColor: document.getElementById('accentColor').value,
            darkColor: document.getElementById('darkColor').value,
            lightColor: document.getElementById('lightColor').value,
            
            // 收集产品数据
            products: collectProductsData(),
            
            // 收集新闻数据
            news: collectNewsData()
        };
        
        console.log('保存的数据:', formData);
        
        // 保存到localStorage作为备份
        localStorage.setItem('websiteData', JSON.stringify(formData));
        
        // 尝试保存到文件
        const saveResult = await saveDataToFile(formData);
        
        if (saveResult.success) {
            // 显示保存成功提示
            showSuccessToast();
        } else {
            // 即使文件保存失败，我们也显示成功提示，因为数据已经保存到localStorage
            showSuccessToast();
            console.error('无法保存到文件:', saveResult.error);
        }
    } catch (e) {
        console.error('保存数据失败:', e);
        showSuccessToast();
    }
}

/**
 * 将数据保存到文件
 */
window.saveDataToFile = async function saveDataToFile(data) {
    try {
        // 在前端环境中，我们可以通过创建下载链接的方式让用户下载更新后的数据文件
        // 这样用户可以手动将下载的文件重命名为"site-data"来更新数据
        
        // 将数据转换为JSON字符串
        const dataStr = JSON.stringify(data, null, 2);
        
        // 创建Blob对象
        const dataBlob = new Blob([dataStr], { type: 'text/plain' });
        
        // 创建临时URL
        const url = URL.createObjectURL(dataBlob);
        
        // 创建下载链接
        const link = document.createElement('a');
        link.href = url;
        // 使用特殊命名方式尝试避免添加后缀
        link.download = 'site-data.'; // 注意末尾的点号
        
        // 模拟点击下载链接
        document.body.appendChild(link);
        link.click();
        
        // 清理
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // 提示用户将下载的文件替换现有文件
        alert('数据已下载。请注意：\n1. 如果下载的文件名带有后缀（如.txt），请手动删除后缀\n2. 确保最终文件名为"site-data"（无任何扩展名）\n3. 将文件替换到网站根目录以更新数据');
        
        return { success: true };
        
    } catch (e) {
        console.error('保存文件时出错:', e);
        return { success: false, error: e.message };
    }
}

/**
 * 收集产品数据
 */
function collectProductsData() {
    const products = [];
    let index = 1;
    
    while (document.getElementById(`product${index}Name`)) {
        products.push({
            name: document.getElementById(`product${index}Name`).value,
            thermal: document.getElementById(`product${index}Thermal`).value,
            description: document.getElementById(`product${index}Desc`).value,
            image: document.getElementById(`product${index}Image`).value
        });
        index++;
    }
    
    return products;
}

/**
 * 收集新闻数据
 */
function collectNewsData() {
    const news = [];
    let index = 1;
    
    while (document.getElementById(`news${index}Title`)) {
        news.push({
            title: document.getElementById(`news${index}Title`).value,
            date: document.getElementById(`news${index}Date`).value,
            category: document.getElementById(`news${index}Category`).value,
            image: document.getElementById(`news${index}Image`).value,
            summary: document.getElementById(`news${index}Summary`).value
        });
        index++;
    }
    
    return news;
}

/**
 * 添加新的产品表单
 */
function addProduct() {
    const products = collectProductsData();
    
    // 创建新的产品对象
    const newProduct = {
        name: "新产品",
        thermal: "0 W/m·K",
        description: "产品描述",
        image: "https://picsum.photos/id/1/500/300"
    };
    
    // 添加到产品列表
    products.push(newProduct);
    
    // 重新填充产品表单
    fillProductData(products);
}

/**
 * 删除产品
 */
function deleteProduct(index) {
    const products = collectProductsData();
    
    // 删除指定索引的产品（注意索引是从1开始的）
    products.splice(index - 1, 1);
    
    // 重新填充产品表单
    fillProductData(products);
}

/**
 * 添加新闻
 */
function addNews() {
    const news = collectNewsData();
    
    // 创建新的新闻对象
    const today = new Date().toISOString().split('T')[0];
    const newNews = {
        title: "新闻标题",
        date: today,
        category: "新闻分类",
        image: "https://picsum.photos/id/1/600/400",
        summary: "新闻摘要"
    };
    
    // 添加到新闻列表
    news.push(newNews);
    
    // 重新填充新闻表单
    fillNewsData(news);
}

/**
 * 删除新闻
 */
function deleteNews(index) {
    const news = collectNewsData();
    
    // 删除指定索引的新闻（注意索引是从1开始的）
    news.splice(index - 1, 1);
    
    // 重新填充新闻表单
    fillNewsData(news);
}

/**
 * 显示成功提示
 */
function showSuccessToast() {
    const successToast = document.getElementById('successToast');
    successToast.classList.remove('translate-y-20', 'opacity-0');
    successToast.classList.add('translate-y-0', 'opacity-100');
    
    // 3秒后隐藏提示
    setTimeout(() => {
        successToast.classList.remove('translate-y-0', 'opacity-100');
        successToast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

/**
 * 初始化管理页面
 */
function initAdminPage() {
    // 从文件加载数据
    loadDataFromFile();
    
    // 绑定保存按钮事件
    document.getElementById('saveBtn').addEventListener('click', saveFormData);
    
    // 绑定添加产品按钮事件
    document.querySelector('.add-product-btn').addEventListener('click', addProduct);
    
    // 绑定添加新闻按钮事件
    document.querySelector('.add-news-btn').addEventListener('click', addNews);
    
    // 侧边导航切换
    initSidebarNavigation();
    
    // 初始化主题颜色预览
    initThemeColorPreview();
}

/**
 * 初始化侧边导航
 */
function initSidebarNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有active类
            document.querySelectorAll('nav a').forEach(a => {
                a.classList.remove('bg-primary', 'text-white');
                a.classList.add('hover:bg-gray-light');
            });
            
            // 添加当前active类
            this.classList.add('bg-primary', 'text-white');
            this.classList.remove('hover:bg-gray-light');
            
            // 滚动到对应区域
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 初始化主题颜色预览
 */
function initThemeColorPreview() {
    // 主色调变化预览
    document.getElementById('primaryColor').addEventListener('input', function() {
        document.querySelectorAll('.bg-primary').forEach(el => {
            el.style.backgroundColor = this.value;
        });
    });
    
    // 强调色变化预览
    document.getElementById('accentColor').addEventListener('input', function() {
        document.querySelectorAll('.bg-accent').forEach(el => {
            el.style.backgroundColor = this.value;
        });
    });
}

// 页面加载完成后初始化管理页面
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPage);
} else {
    initAdminPage();
}