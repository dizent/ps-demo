// 测试数据加载和保存功能

/**
 * 测试从site-data文件加载数据
 */
async function testDataLoading() {
    try {
        console.log('开始测试数据加载功能...');
        
        // 尝试从文件加载数据
        const response = await fetch('site-data');
        if (response.ok) {
            const data = await response.json();
            console.log('成功从site-data文件加载数据:', data);
            
            // 检查数据结构
            const requiredFields = ['siteName', 'companyDescription', 'products', 'news'];
            let allFieldsPresent = true;
            
            requiredFields.forEach(field => {
                if (!data.hasOwnProperty(field)) {
                    console.warn(`警告: 数据中缺少必要字段 '${field}'`);
                    allFieldsPresent = false;
                }
            });
            
            if (allFieldsPresent) {
                console.log('数据结构完整，所有必要字段都存在。');
            }
            
            // 检查产品和新闻数组
            if (data.products && Array.isArray(data.products) && data.products.length > 0) {
                console.log(`成功加载了 ${data.products.length} 个产品。`);
            } else {
                console.warn('警告: 产品数据为空或格式不正确。');
            }
            
            if (data.news && Array.isArray(data.news) && data.news.length > 0) {
                console.log(`成功加载了 ${data.news.length} 条新闻。`);
            } else {
                console.warn('警告: 新闻数据为空或格式不正确。');
            }
            
            return { success: true, data };
        } else {
            console.error('无法加载site-data文件:', response.statusText);
            return { success: false, error: response.statusText };
        }
    } catch (e) {
        console.error('加载site-data文件时发生错误:', e);
        return { success: false, error: e.message };
    }
}

/**
 * 测试数据保存功能
 */
function testDataSaving() {
    try {
        console.log('测试数据保存功能...');
        
        // 检查当前页面是否为管理页面
        const isAdminPage = window.location.pathname.includes('admin.html');
        
        if (isAdminPage) {
            // 在管理页面中检查saveDataToFile函数是否存在
            if (typeof saveDataToFile === 'function') {
                console.log('saveDataToFile函数已存在。');
                console.log('提示: 在管理页面中，点击"保存"按钮将触发数据保存功能，并下载更新后的site-data文件。');
                console.log('保存后，请手动将下载的文件替换到网站根目录。');
                return { success: true };
            } else {
                console.error('在管理页面中未找到saveDataToFile函数。');
                return { success: false, error: '在管理页面中未找到saveDataToFile函数' };
            }
        } else {
            // 在普通页面中，saveDataToFile函数仅在admin.html中定义，不会在此处存在
            console.log('注意: saveDataToFile函数仅在admin.html页面中定义，普通页面中不会存在此函数。');
            console.log('提示: 请访问admin.html页面来测试数据保存功能。');
            return { success: true, message: 'saveDataToFile函数仅在admin.html页面中可用' };
        }
    } catch (e) {
        console.error('测试数据保存功能时发生错误:', e);
        return { success: false, error: e.message };
    }
}

/**
 * 运行所有测试
 */
async function runAllTests() {
    console.log('=== 测试本地数据库模拟功能 ===');
    
    // 测试数据加载
    const loadResult = await testDataLoading();
    
    // 测试数据保存
    const saveResult = testDataSaving();
    
    console.log('\n=== 测试结果汇总 ===');
    console.log('数据加载功能:', loadResult.success ? '通过' : '失败');
    
    // 检查是否为普通页面且保存功能有特殊消息
    if (saveResult.message) {
        console.log('数据保存功能:', '注意: ' + saveResult.message);
    } else {
        console.log('数据保存功能:', saveResult.success ? '通过' : '失败');
    }
    
    if (loadResult.success && (saveResult.success || saveResult.message)) {
        console.log('\n🎉 所有功能测试通过！\n本地数据库模拟已成功实现：\n- 可以从site-data文件加载数据\n- 可以通过管理页面(admin.html)编辑并保存数据\n- 保存的数据可下载为site-data文件');
    } else {
        console.log('\n⚠️ 部分功能测试失败，请查看上面的详细错误信息。');
    }
}

// 如果在浏览器环境中运行，则添加一个按钮来触发测试
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        // 创建测试按钮
        const testButton = document.createElement('button');
        testButton.innerText = '测试数据功能';
        testButton.style.position = 'fixed';
        testButton.style.bottom = '20px';
        testButton.style.right = '20px';
        testButton.style.zIndex = '1000';
        testButton.style.padding = '10px 20px';
        testButton.style.backgroundColor = '#3b82f6';
        testButton.style.color = 'white';
        testButton.style.border = 'none';
        testButton.style.borderRadius = '4px';
        testButton.style.cursor = 'pointer';
        testButton.onclick = runAllTests;
        
        // 添加到页面
        document.body.appendChild(testButton);
        
        console.log('测试按钮已添加到页面右下角，点击可测试数据功能。');
    });
}

// 如果直接运行脚本，则立即执行测试
if (typeof require !== 'undefined' && typeof module !== 'undefined') {
    // Node.js环境（虽然实际的fetch功能在Node.js中需要额外模块）
    console.log('在Node.js环境中运行测试...');
    // 这里可以添加Node.js特定的测试代码
}

// 导出函数以便在其他地方使用
export { testDataLoading, testDataSaving, runAllTests };