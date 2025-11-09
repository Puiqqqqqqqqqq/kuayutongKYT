// 翻译演示功能
document.addEventListener('DOMContentLoaded', function() {
  const sourceText = document.getElementById('sourceText');
  const resultContent = document.getElementById('resultContent');
  const translationResult = document.getElementById('translationResult');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const emptyResult = document.getElementById('emptyResult');
  const sourceLanguage = document.getElementById('sourceLanguage');
  const targetLanguage = document.getElementById('targetLanguage');
  const translateBtn = document.getElementById('translateBtn');
  const copyBtn = document.getElementById('copyBtn');
  const copyResultBtn = document.getElementById('copyResultBtn');
  const listenResultBtn = document.getElementById('listenResultBtn');
  const clearSourceBtn = document.getElementById('clearSourceBtn');
  const pasteSourceBtn = document.getElementById('pasteSourceBtn');
  const swapLanguagesBtn = document.getElementById('swapLanguages');
  const realTimeTranslation = document.getElementById('realTimeTranslation');
  const charCount = document.getElementById('charCount');
  const translationStatus = document.getElementById('translationStatus');
  const copyStatus = document.getElementById('copyStatus');
  
  // 翻译规则 - 电商领域常用关键词（扩充版）
  const translationRules = {
    // 产品特性
    '无线蓝牙耳机': {
      'en': 'wireless Bluetooth headset',
      'es': 'auricular Bluetooth inalámbrico',
      'fr': 'casque Bluetooth sans fil',
      'de': 'kabelloses Bluetooth-Headset',
      'ja': 'ワイヤレスBluetoothヘッドセット',
      'ko': '무선 블루투스 헤드셋',
      'ru': 'беспроводное Bluetooth-гарнитура'
    },
    '音质清晰': {
      'en': 'clear sound quality',
      'es': 'calidad de sonido clara',
      'fr': 'qualité de son clair',
      'de': 'klare Klangqualität',
      'ja': '音質が明確',
      'ko': '음질이 선명',
      'ru': 'четкое звучание'
    },
    '续航时间': {
      'en': 'battery life',
      'es': 'duración de la batería',
      'fr': 'durée de vie de la batterie',
      'de': 'Batterielebensdauer',
      'ja': 'バッテリー寿命',
      'ko': '배터리 수명',
      'ru': 'время работы от батареи'
    },
    '长达24小时': {
      'en': 'up to 24 hours',
      'es': 'hasta 24 horas',
      'fr': 'jusqu\'à 24 heures',
      'de': 'bis zu 24 Stunden',
      'ja': '最大24時間',
      'ko': '최대 24시간',
      'ru': 'до 24 часов'
    },
    '快充功能': {
      'en': 'fast charging function',
      'es': 'función de carga rápida',
      'fr': 'fonction de charge rapide',
      'de': 'Schnellladfunktion',
      'ja': 'クイックチャージ機能',
      'ko': '빠른 충전 기능',
      'ru': 'функция быстрой зарядки'
    },
    '兼容各种设备': {
      'en': 'compatible with various devices',
      'es': 'compatible con varios dispositivos',
      'fr': 'compatible avec divers appareils',
      'de': 'kompatibel mit verschiedenen Geräten',
      'ja': '様々なデバイスと互換性があります',
      'ko': '다양한 기기와 호환',
      'ru': 'совместим с различными устройствами'
    },
    
    // 营销词汇
    '热销': {
      'en': 'best-selling',
      'es': 'bestseller',
      'fr': 'bestseller',
      'de': 'bestseller',
      'ja': 'ベストセラー',
      'ko': '베스트셀러',
      'ru': 'бестселлер'
    },
    '新品上市': {
      'en': 'new product launch',
      'es': 'lanzamiento de nuevo producto',
      'fr': 'lancement de nouveau produit',
      'de': 'Neuheit',
      'ja': '新製品発売',
      'ko': '신제품 출시',
      'ru': 'новый товар'
    },
    '限时优惠': {
      'en': 'limited time offer',
      'es': 'oferta por tiempo limitado',
      'fr': 'offre limitée dans le temps',
      'de': '限时优惠',
      'ja': '期間限定オファー',
      'ko': '시간 제한 할인',
      'ru': 'ограниченное предложение'
    },
    '折扣': {
      'en': 'discount',
      'es': 'descuento',
      'fr': 'remise',
      'de': 'Rabatt',
      'ja': '割引',
      'ko': '할인',
      'ru': 'скидка'
    },
    '免费配送': {
      'en': 'free shipping',
      'es': 'envío gratuito',
      'fr': 'livraison gratuite',
      'de': 'kostenloser Versand',
      'ja': '無料配送',
      'ko': '무료 배송',
      'ru': 'бесплатная доставка'
    },
    '品质保证': {
      'en': 'quality guarantee',
      'es': 'garantía de calidad',
      'fr': 'garantie de qualité',
      'de': 'Qualitätsgarantie',
      'ja': '品質保証',
      'ko': '품질 보증',
      'ru': 'гарантия качества'
    },
    '售后服务': {
      'en': 'after-sales service',
      'es': 'servicio posventa',
      'fr': 'service après-vente',
      'de': 'After-Sales-Service',
      'ja': 'アフターサービス',
      'ko': '애프터 서비스',
      'ru': 'постпродажное обслуживание'
    },
    
    // 产品类型
    '智能手机': {
      'en': 'smartphone',
      'es': 'teléfono inteligente',
      'fr': 'téléphone intelligent',
      'de': 'Smartphone',
      'ja': 'スマートフォン',
      'ko': '스마트폰',
      'ru': 'смартфон'
    },
    '平板电脑': {
      'en': 'tablet',
      'es': 'tableta',
      'fr': 'tablette',
      'de': 'Tablet',
      'ja': 'タブレット',
      'ko': '태블릿',
      'ru': 'планшет'
    },
    '智能手表': {
      'en': 'smartwatch',
      'es': 'reloj inteligente',
      'fr': 'montre intelligente',
      'de': 'Smartwatch',
      'ja': 'スマートウォッチ',
      'ko': '스마트워치',
      'ru': 'смарт-часы'
    },
    '笔记本电脑': {
      'en': 'laptop',
      'es': 'portátil',
      'fr': 'ordinateur portable',
      'de': 'Laptop',
      'ja': 'ノートパソコン',
      'ko': '노트북',
      'ru': 'ноутбук'
    },
    
    // 尺寸和颜色
    '尺寸': {
      'en': 'size',
      'es': 'tamaño',
      'fr': 'taille',
      'de': 'Größe',
      'ja': 'サイズ',
      'ko': '사이즈',
      'ru': 'размер'
    },
    '颜色': {
      'en': 'color',
      'es': 'color',
      'fr': 'couleur',
      'de': 'Farbe',
      'ja': '色',
      'ko': '색상',
      'ru': 'цвет'
    },
    '黑色': {
      'en': 'black',
      'es': 'negro',
      'fr': 'noir',
      'de': 'schwarz',
      'ja': '黒',
      'ko': '검은색',
      'ru': 'черный'
    },
    '白色': {
      'en': 'white',
      'es': 'blanco',
      'fr': 'blanc',
      'de': 'weiß',
      'ja': '白',
      'ko': '흰색',
      'ru': 'белый'
    },
    '金色': {
      'en': 'gold',
      'es': 'dorado',
      'fr': 'or',
      'de': 'gold',
      'ja': '金',
      'ko': '금색',
      'ru': 'золотой'
    },
    
    // 新增常用词汇
    '高清': {
      'en': 'high definition',
      'es': 'alta definición',
      'fr': 'haute définition',
      'de': 'HD (High Definition)',
      'ja': '高清',
      'ko': 'HD',
      'ru': 'Высокое разрешение'
    },
    '智能': {
      'en': 'smart',
      'es': 'inteligente',
      'fr': 'intelligent',
      'de': 'smart',
      'ja': 'スマート',
      'ko': '스마트',
      'ru': 'умный'
    },
    '便携式': {
      'en': 'portable',
      'es': 'portátil',
      'fr': 'portable',
      'de': 'portabel',
      'ja': 'ポータブル',
      'ko': '휴대용',
      'ru': 'портативный'
    },
    '轻薄': {
      'en': 'slim and light',
      'es': 'delgado y ligero',
      'fr': 'mince et léger',
      'de': 'schlank und leicht',
      'ja': 'スリムで軽い',
      'ko': '슬림하고 가벼운',
      'ru': 'тонкий и легкий'
    },
    '大容量': {
      'en': 'large capacity',
      'es': 'gran capacidad',
      'fr': 'grande capacité',
      'de': 'große Kapazität',
      'ja': '大容量',
      'ko': '대용량',
      'ru': 'большая емкость'
    },
    '长寿命': {
      'en': 'long lifespan',
      'es': 'larga vida útil',
      'fr': 'longue durée de vie',
      'de': 'lange Lebensdauer',
      'ja': '長寿命',
      'ko': '장수명',
      'ru': 'длинный срок службы'
    },
    '防水': {
      'en': 'waterproof',
      'es': 'impermeable',
      'fr': 'étanche',
      'de': 'wasserdicht',
      'ja': '防水',
      'ko': '방수',
      'ru': 'водонепроницаемый'
    },
    '防摔': {
      'en': 'shockproof',
      'es': 'resistente a golpes',
      'fr': 'résistant aux chocs',
      'de': 'stossfest',
      'ja': '耐衝撃',
      'ko': '충격 방지',
      'ru': 'ударопрочный'
    },
    '多功能': {
      'en': 'multi-functional',
      'es': 'multifuncional',
      'fr': 'multifonctionnel',
      'de': 'multifunktional',
      'ja': '多機能',
      'ko': '다기능',
      'ru': 'мультифункциональный'
    },
    '易操作': {
      'en': 'easy to operate',
      'es': 'fácil de operar',
      'fr': 'facile à utiliser',
      'de': 'einfach zu bedienen',
      'ja': '操作が簡単',
      'ko': '사용하기 쉬운',
      'ru': 'легкий в эксплуатации'
    },
    '快速充电': {
      'en': 'fast charging',
      'es': 'carga rápida',
      'fr': 'charge rapide',
      'de': 'Schnellladung',
      'ja': 'クイックチャージ',
      'ko': '빠른 충전',
      'ru': 'быстрая зарядка'
    },
    '安全': {
      'en': 'safe',
      'es': 'seguro',
      'fr': 'sûr',
      'de': 'sicher',
      'ja': '安全',
      'ko': '안전한',
      'ru': 'безопасный'
    },
    '可靠': {
      'en': 'reliable',
      'es': 'fiable',
      'fr': 'fiable',
      'de': 'zuverlässig',
      'ja': '信頼性が高い',
      'ko': '안정적인',
      'ru': 'надежный'
    },
    '耐用': {
      'en': 'durable',
      'es': 'duradero',
      'fr': 'durable',
      'de': 'haltbar',
      'ja': '耐久性がある',
      'ko': '내구성이 있는',
      'ru': 'прочный'
    },
    '时尚': {
      'en': 'fashionable',
      'es': 'fashionable',
      'fr': 'élégant',
      'de': 'modisch',
      'ja': 'ファッショナブル',
      'ko': '패션적인',
      'ru': 'модный'
    },
    '舒适': {
      'en': 'comfortable',
      'es': 'cómodo',
      'fr': 'confortable',
      'de': 'komfortabel',
      'ja': '快適',
      'ko': '편안한',
      'ru': 'комфортный'
    },
    '高效': {
      'en': 'efficient',
      'es': 'eficiente',
      'fr': 'efficace',
      'de': 'effizient',
      'ja': '効率的',
      'ko': '효율적인',
      'ru': 'эффективный'
    },
    '节能': {
      'en': 'energy-saving',
      'es': 'ahorro de energía',
      'fr': 'économiseur d\'énergie',
      'de': 'energiesparend',
      'ja': '省エネ',
      'ko': '에너지 절약',
      'ru': 'энергосберегающий'
    },
    '环保': {
      'en': 'environmentally friendly',
      'es': 'ecológico',
      'fr': 'écologique',
      'de': 'umweltfreundlich',
      'ja': '環境にやさしい',
      'ko': '친환경적인',
      'ru': 'экологически чистый'
    },
    '经济实惠': {
      'en': 'cost-effective',
      'es': 'económico',
      'fr': 'économique',
      'de': 'kostengünstig',
      'ja': '経済的',
      'ko': '경제적인',
      'ru': 'экономичный'
    },
    '性价比高': {
      'en': 'high cost performance',
      'es': 'alta relación calidad-precio',
      'fr': 'bonne qualité-prix',
      'de': 'hohe Preis-Leistungs-Verhältnis',
      'ja': 'コストパフォーマンスが高い',
      'ko': '가성비가 좋은',
      'ru': 'высокое соотношение цена-качество'
    }
  };
  
  // 语言代码映射
  const languageMap = {
    'auto': '自动检测',
    'zh': '中文',
    'en': '英语',
    'es': '西班牙语',
    'fr': '法语',
    'de': '德语',
    'ja': '日语',
    'ko': '韩语',
    'ru': '俄语'
  };
  
  // 语言方向映射
  const languageDirection = {
    'auto': 'ltr',
    'zh': 'ltr',
    'en': 'ltr',
    'es': 'ltr',
    'fr': 'ltr',
    'de': 'ltr',
    'ja': 'ltr',
    'ko': 'ltr',
    'ru': 'ltr'
  };
  
  // 检测语言函数
  function detectLanguage(text) {
    // 简单的语言检测逻辑
    // 实际应用中可以使用更复杂的语言检测库
    if (/[\u4e00-\u9fa5]/.test(text)) {
      return 'zh'; // 中文
    } else if (/[あ-んア-ン]/.test(text)) {
      return 'ja'; // 日语
    } else if (/[가-힣]/.test(text)) {
      return 'ko'; // 韩语
    } else if (/[а-яА-Я]/.test(text)) {
      return 'ru'; // 俄语
    } else if (/[éèêëàâäôöùûüÿçñ]/.test(text)) {
      // 包含法语特殊字符
      return 'fr';
    } else if (/[ñáéíóúü]/.test(text)) {
      // 包含西班牙语特殊字符
      return 'es';
    } else if (/[äöüß]/.test(text)) {
      // 包含德语特殊字符
      return 'de';
    } else {
      return 'en'; // 默认英语
    }
  }
  
  // 翻译函数
  function translateText(text, sourceLang, targetLang) {
    // 如果源语言是自动检测，则先检测语言
    const actualSourceLang = sourceLang === 'auto' ? detectLanguage(text) : sourceLang;
    
    // 如果源语言和目标语言相同，则直接返回原文
    if (actualSourceLang === targetLang) {
      return text;
    }
    
    let result = text;
    
    // 应用翻译规则
    for (const [sourcePhrase, translations] of Object.entries(translationRules)) {
      if (translations[targetLang]) {
        // 根据源语言决定匹配方式
        if (actualSourceLang === 'zh') {
          // 中文短语直接匹配
          result = result.replace(new RegExp(sourcePhrase, 'g'), translations[targetLang]);
        } else {
          // 其他语言需要反向查找
          for (const [phrase, trans] of Object.entries(translationRules)) {
            if (trans[actualSourceLang] === sourcePhrase) {
              result = result.replace(new RegExp(sourcePhrase, 'g'), trans[targetLang] || sourcePhrase);
              break;
            }
          }
        }
      }
    }
    
    // 处理句子级别的翻译（简单示例）
    if (actualSourceLang === 'zh' && targetLang === 'en') {
      // 中文到英文的简单句子翻译规则
      result = result.replace(/这款(.*?)是(.*?)/g, 'This $1 is $2');
      result = result.replace(/支持(.*?)功能/g, 'supports $1 function');
      result = result.replace(/具有(.*?)特点/g, 'has $1 features');
      result = result.replace(/可以(.*?)/g, 'can $1');
      result = result.replace(/能够(.*?)/g, 'is able to $1');
      result = result.replace(/适合(.*?)使用/g, 'suitable for $1 use');
      result = result.replace(/易于(.*?)/g, 'easy to $1');
      result = result.replace(/提供(.*?)/g, 'provides $1');
      result = result.replace(/拥有(.*?)/g, 'has $1');
      result = result.replace(/采用(.*?)/g, 'adopts $1');
      result = result.replace(/采用了(.*?)/g, 'has adopted $1');
      result = result.replace(/采用了(.*?)技术/g, 'has adopted $1 technology');
      result = result.replace(/基于(.*?)技术/g, 'based on $1 technology');
      result = result.replace(/集成了(.*?)/g, 'integrated with $1');
      result = result.replace(/配备了(.*?)/g, 'equipped with $1');
      result = result.replace(/内置(.*?)/g, 'built-in $1');
      result = result.replace(/外观(.*?)/g, 'appearance is $1');
      result = result.replace(/设计(.*?)/g, 'designed with $1');
      result = result.replace(/的设计/g, ' design');
      result = result.replace(/性能(.*?)/g, 'performance is $1');
      result = result.replace(/效果(.*?)/g, 'effect is $1');
      result = result.replace(/质量(.*?)/g, 'quality is $1');
      result = result.replace(/保证(.*?)/g, 'guarantees $1');
      result = result.replace(/确保(.*?)/g, 'ensures $1');
      result = result.replace(/实现(.*?)/g, 'achieves $1');
      result = result.replace(/达到(.*?)/g, 'reaches $1');
      result = result.replace(/高达(.*?)/g, 'up to $1');
      result = result.replace(/长达(.*?)/g, 'up to $1');
      result = result.replace(/只需(.*?)/g, 'only needs $1');
      result = result.replace(/只需(.*?)即可/g, 'only needs $1 to');
      result = result.replace(/即可(.*?)/g, 'can $1');
      result = result.replace(/就能(.*?)/g, 'can $1');
      result = result.replace(/就能实现(.*?)/g, 'can achieve $1');
      result = result.replace(/让(.*?)更加(.*?)/g, 'makes $1 more $2');
      result = result.replace(/使(.*?)更加(.*?)/g, 'makes $1 more $2');
      result = result.replace(/使(.*?)变得(.*?)/g, 'makes $1 become $2');
      result = result.replace(/帮助(.*?)更好地(.*?)/g, 'helps $1 better $2');
      result = result.replace(/帮助(.*?)提高(.*?)/g, 'helps $1 improve $2');
      result = result.replace(/提高(.*?)/g, 'improves $1');
      result = result.replace(/提升(.*?)/g, 'enhances $1');
      result = result.replace(/增强(.*?)/g, 'strengthens $1');
      result = result.replace(/增加(.*?)/g, 'increases $1');
      result = result.replace(/减少(.*?)/g, 'reduces $1');
      result = result.replace(/降低(.*?)/g, 'lowers $1');
      result = result.replace(/节省(.*?)/g, 'saves $1');
      result = result.replace(/节约(.*?)/g, 'saves $1');
      result = result.replace(/优化(.*?)/g, 'optimizes $1');
      result = result.replace(/改进(.*?)/g, 'improves $1');
      result = result.replace(/完善(.*?)/g, 'perfects $1');
      result = result.replace(/满足(.*?)需求/g, 'meets $1 needs');
      result = result.replace(/符合(.*?)标准/g, 'complies with $1 standards');
      result = result.replace(/通过(.*?)认证/g, 'passed $1 certification');
      result = result.replace(/获得(.*?)认证/g, 'obtained $1 certification');
      result = result.replace(/适用(.*?)场景/g, 'suitable for $1 scenarios');
      result = result.replace(/适用于(.*?)/g, 'suitable for $1');
      result = result.replace(/适合(.*?)/g, 'suitable for $1');
      result = result.replace(/适合于(.*?)/g, 'suitable for $1');
      result = result.replace(/适用于各种(.*?)/g, 'suitable for various $1');
      result = result.replace(/适用于不同(.*?)/g, 'suitable for different $1');
      result = result.replace(/兼容(.*?)/g, 'compatible with $1');
      result = result.replace(/兼容各种(.*?)/g, 'compatible with various $1');
      result = result.replace(/兼容不同(.*?)/g, 'compatible with different $1');
      result = result.replace(/支持(.*?)/g, 'supports $1');
      result = result.replace(/支持各种(.*?)/g, 'supports various $1');
      result = result.replace(/支持不同(.*?)/g, 'supports different $1');
      result = result.replace(/支持多种(.*?)/g, 'supports multiple $1');
      result = result.replace(/支持多种(.*?)格式/g, 'supports multiple $1 formats');
      result = result.replace(/支持多种(.*?)语言/g, 'supports multiple $1 languages');
      result = result.replace(/支持多种(.*?)设备/g, 'supports multiple $1 devices');
      result = result.replace(/支持多种(.*?)系统/g, 'supports multiple $1 systems');
      result = result.replace(/支持多种(.*?)平台/g, 'supports multiple $1 platforms');
      result = result.replace(/支持多种(.*?)协议/g, 'supports multiple $1 protocols');
      result = result.replace(/支持多种(.*?)标准/g, 'supports multiple $1 standards');
      result = result.replace(/支持多种(.*?)接口/g, 'supports multiple $1 interfaces');
      result = result.replace(/支持多种(.*?)连接/g, 'supports multiple $1 connections');
      result = result.replace(/支持多种(.*?)方式/g, 'supports multiple $1 methods');
      result = result.replace(/支持多种(.*?)模式/g, 'supports multiple $1 modes');
      result = result.replace(/支持多种(.*?)功能/g, 'supports multiple $1 functions');
      result = result.replace(/支持多种(.*?)特性/g, 'supports multiple $1 features');
      result = result.replace(/支持多种(.*?)选项/g, 'supports multiple $1 options');
      result = result.replace(/支持多种(.*?)设置/g, 'supports multiple $1 settings');
      result = result.replace(/支持多种(.*?)配置/g, 'supports multiple $1 configurations');
      result = result.replace(/支持多种(.*?)参数/g, 'supports multiple $1 parameters');
      result = result.replace(/支持多种(.*?)规格/g, 'supports multiple $1 specifications');
      result = result.replace(/支持多种(.*?)型号/g, 'supports multiple $1 models');
      result = result.replace(/支持多种(.*?)版本/g, 'supports multiple $1 versions');
      result = result.replace(/支持多种(.*?)类型/g, 'supports multiple $1 types');
      result = result.replace(/支持多种(.*?)类别/g, 'supports multiple $1 categories');
      result = result.replace(/支持多种(.*?)分类/g, 'supports multiple $1 classifications');
      result = result.replace(/支持多种(.*?)等级/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)档次/g, 'supports multiple $1 grades');
      result = result.replace(/支持多种(.*?)价位/g, 'supports multiple $1 price ranges');
      result = result.replace(/支持多种(.*?)风格/g, 'supports multiple $1 styles');
      result = result.replace(/支持多种(.*?)款式/g, 'supports multiple $1 designs');
      result = result.replace(/支持多种(.*?)颜色/g, 'supports multiple $1 colors');
      result = result.replace(/支持多种(.*?)尺寸/g, 'supports multiple $1 sizes');
      result = result.replace(/支持多种(.*?)规格/g, 'supports multiple $1 specifications');
      result = result.replace(/支持多种(.*?)材质/g, 'supports multiple $1 materials');
      result = result.replace(/支持多种(.*?)工艺/g, 'supports multiple $1 crafts');
      result = result.replace(/支持多种(.*?)技术/g, 'supports multiple $1 technologies');
      result = result.replace(/支持多种(.*?)算法/g, 'supports multiple $1 algorithms');
      result = result.replace(/支持多种(.*?)方法/g, 'supports multiple $1 methods');
      result = result.replace(/支持多种(.*?)策略/g, 'supports multiple $1 strategies');
      result = result.replace(/支持多种(.*?)方案/g, 'supports multiple $1 solutions');
      result = result.replace(/支持多种(.*?)计划/g, 'supports multiple $1 plans');
      result = result.replace(/支持多种(.*?)项目/g, 'supports multiple $1 projects');
      result = result.replace(/支持多种(.*?)任务/g, 'supports multiple $1 tasks');
      result = result.replace(/支持多种(.*?)工作/g, 'supports multiple $1 jobs');
      result = result.replace(/支持多种(.*?)作业/g, 'supports multiple $1 operations');
      result = result.replace(/支持多种(.*?)操作/g, 'supports multiple $1 operations');
      result = result.replace(/支持多种(.*?)功能/g, 'supports multiple $1 functions');
      result = result.replace(/支持多种(.*?)特性/g, 'supports multiple $1 features');
      result = result.replace(/支持多种(.*?)优点/g, 'supports multiple $1 advantages');
      result = result.replace(/支持多种(.*?)好处/g, 'supports multiple $1 benefits');
      result = result.replace(/支持多种(.*?)优势/g, 'supports multiple $1 advantages');
      result = result.replace(/支持多种(.*?)特色/g, 'supports multiple $1 features');
      result = result.replace(/支持多种(.*?)特点/g, 'supports multiple $1 characteristics');
      result = result.replace(/支持多种(.*?)属性/g, 'supports multiple $1 attributes');
      result = result.replace(/支持多种(.*?)性质/g, 'supports multiple $1 properties');
      result = result.replace(/支持多种(.*?)特质/g, 'supports multiple $1 traits');
      result = result.replace(/支持多种(.*?)特征/g, 'supports multiple $1 features');
      result = result.replace(/支持多种(.*?)征象/g, 'supports multiple $1 signs');
      result = result.replace(/支持多种(.*?)现象/g, 'supports multiple $1 phenomena');
      result = result.replace(/支持多种(.*?)状况/g, 'supports multiple $1 conditions');
      result = result.replace(/支持多种(.*?)状态/g, 'supports multiple $1 states');
      result = result.replace(/支持多种(.*?)情形/g, 'supports multiple $1 situations');
      result = result.replace(/支持多种(.*?)情况/g, 'supports multiple $1 circumstances');
      result = result.replace(/支持多种(.*?)环境/g, 'supports multiple $1 environments');
      result = result.replace(/支持多种(.*?)场景/g, 'supports multiple $1 scenarios');
      result = result.replace(/支持多种(.*?)场合/g, 'supports multiple $1 occasions');
      result = result.replace(/支持多种(.*?)场所/g, 'supports multiple $1 places');
      result = result.replace(/支持多种(.*?)地点/g, 'supports multiple $1 locations');
      result = result.replace(/支持多种(.*?)位置/g, 'supports multiple $1 positions');
      result = result.replace(/支持多种(.*?)方位/g, 'supports multiple $1 directions');
      result = result.replace(/支持多种(.*?)方向/g, 'supports multiple $1 directions');
      result = result.replace(/支持多种(.*?)角度/g, 'supports multiple $1 angles');
      result = result.replace(/支持多种(.*?)视角/g, 'supports multiple $1 perspectives');
      result = result.replace(/支持多种(.*?)观点/g, 'supports multiple $1 viewpoints');
      result = result.replace(/支持多种(.*?)看法/g, 'supports multiple $1 opinions');
      result = result.replace(/支持多种(.*?)见解/g, 'supports multiple $1 insights');
      result = result.replace(/支持多种(.*?)认识/g, 'supports multiple $1 understandings');
      result = result.replace(/支持多种(.*?)理解/g, 'supports multiple $1 understandings');
      result = result.replace(/支持多种(.*?)了解/g, 'supports multiple $1 understandings');
      result = result.replace(/支持多种(.*?)知识/g, 'supports multiple $1 knowledge');
      result = result.replace(/支持多种(.*?)学问/g, 'supports multiple $1 knowledge');
      result = result.replace(/支持多种(.*?)学识/g, 'supports multiple $1 knowledge');
      result = result.replace(/支持多种(.*?)学术/g, 'supports multiple $1 academics');
      result = result.replace(/支持多种(.*?)学科/g, 'supports multiple $1 disciplines');
      result = result.replace(/支持多种(.*?)专业/g, 'supports multiple $1 majors');
      result = result.replace(/支持多种(.*?)行业/g, 'supports multiple $1 industries');
      result = result.replace(/支持多种(.*?)领域/g, 'supports multiple $1 fields');
      result = result.replace(/支持多种(.*?)范畴/g, 'supports multiple $1 categories');
      result = result.replace(/支持多种(.*?)范围/g, 'supports multiple $1 ranges');
      result = result.replace(/支持多种(.*?)规模/g, 'supports multiple $1 scales');
      result = result.replace(/支持多种(.*?)程度/g, 'supports multiple $1 degrees');
      result = result.replace(/支持多种(.*?)水平/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)档次/g, 'supports multiple $1 grades');
      result = result.replace(/支持多种(.*?)等级/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)级别/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)层级/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)层次/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)层面/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)方面/g, 'supports multiple $1 aspects');
      result = result.replace(/支持多种(.*?)维度/g, 'supports multiple $1 dimensions');
      result = result.replace(/支持多种(.*?)因素/g, 'supports multiple $1 factors');
      result = result.replace(/支持多种(.*?)要素/g, 'supports multiple $1 elements');
      result = result.replace(/支持多种(.*?)成分/g, 'supports multiple $1 components');
      result = result.replace(/支持多种(.*?)组成/g, 'supports multiple $1 components');
      result = result.replace(/支持多种(.*?)构成/g, 'supports multiple $1 components');
      result = result.replace(/支持多种(.*?)结构/g, 'supports multiple $1 structures');
      result = result.replace(/支持多种(.*?)构造/g, 'supports multiple $1 structures');
      result = result.replace(/支持多种(.*?)组织/g, 'supports multiple $1 organizations');
      result = result.replace(/支持多种(.*?)机构/g, 'supports multiple $1 institutions');
      result = result.replace(/支持多种(.*?)体系/g, 'supports multiple $1 systems');
      result = result.replace(/支持多种(.*?)系统/g, 'supports multiple $1 systems');
      result = result.replace(/支持多种(.*?)制度/g, 'supports multiple $1 systems');
      result = result.replace(/支持多种(.*?)机制/g, 'supports multiple $1 mechanisms');
      result = result.replace(/支持多种(.*?)程序/g, 'supports multiple $1 programs');
      result = result.replace(/支持多种(.*?)流程/g, 'supports multiple $1 processes');
      result = result.replace(/支持多种(.*?)过程/g, 'supports multiple $1 processes');
      result = result.replace(/支持多种(.*?)步骤/g, 'supports multiple $1 steps');
      result = result.replace(/支持多种(.*?)阶段/g, 'supports multiple $1 stages');
      result = result.replace(/支持多种(.*?)时期/g, 'supports multiple $1 periods');
      result = result.replace(/支持多种(.*?)时代/g, 'supports multiple $1 eras');
      result = result.replace(/支持多种(.*?)年代/g, 'supports multiple $1 decades');
      result = result.replace(/支持多种(.*?)年度/g, 'supports multiple $1 years');
      result = result.replace(/支持多种(.*?)年份/g, 'supports multiple $1 years');
      result = result.replace(/支持多种(.*?)季节/g, 'supports multiple $1 seasons');
      result = result.replace(/支持多种(.*?)月份/g, 'supports multiple $1 months');
      result = result.replace(/支持多种(.*?)日期/g, 'supports multiple $1 dates');
      result = result.replace(/支持多种(.*?)时间/g, 'supports multiple $1 times');
      result = result.replace(/支持多种(.*?)时刻/g, 'supports multiple $1 moments');
      result = result.replace(/支持多种(.*?)时候/g, 'supports multiple $1 times');
      result = result.replace(/支持多种(.*?)时期/g, 'supports multiple $1 periods');
      result = result.replace(/支持多种(.*?)阶段/g, 'supports multiple $1 stages');
      result = result.replace(/支持多种(.*?)步骤/g, 'supports multiple $1 steps');
      result = result.replace(/支持多种(.*?)过程/g, 'supports multiple $1 processes');
      result = result.replace(/支持多种(.*?)流程/g, 'supports multiple $1 processes');
      result = result.replace(/支持多种(.*?)程序/g, 'supports multiple $1 programs');
      result = result.replace(/支持多种(.*?)机制/g, 'supports multiple $1 mechanisms');
      result = result.replace(/支持多种(.*?)制度/g, 'supports multiple $1 systems');
      result = result.replace(/支持多种(.*?)系统/g, 'supports multiple $1 systems');
      result = result.replace(/支持多种(.*?)体系/g, 'supports multiple $1 systems');
      result = result.replace(/支持多种(.*?)机构/g, 'supports multiple $1 institutions');
      result = result.replace(/支持多种(.*?)组织/g, 'supports multiple $1 organizations');
      result = result.replace(/支持多种(.*?)构造/g, 'supports multiple $1 structures');
      result = result.replace(/支持多种(.*?)结构/g, 'supports multiple $1 structures');
      result = result.replace(/支持多种(.*?)构成/g, 'supports multiple $1 components');
      result = result.replace(/支持多种(.*?)组成/g, 'supports multiple $1 components');
      result = result.replace(/支持多种(.*?)成分/g, 'supports multiple $1 components');
      result = result.replace(/支持多种(.*?)要素/g, 'supports multiple $1 elements');
      result = result.replace(/支持多种(.*?)因素/g, 'supports multiple $1 factors');
      result = result.replace(/支持多种(.*?)维度/g, 'supports multiple $1 dimensions');
      result = result.replace(/支持多种(.*?)方面/g, 'supports multiple $1 aspects');
      result = result.replace(/支持多种(.*?)层面/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)层次/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)层级/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)级别/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)等级/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)档次/g, 'supports multiple $1 grades');
      result = result.replace(/支持多种(.*?)水平/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)程度/g, 'supports multiple $1 degrees');
      result = result.replace(/支持多种(.*?)规模/g, 'supports multiple $1 scales');
      result = result.replace(/支持多种(.*?)范围/g, 'supports multiple $1 ranges');
      result = result.replace(/支持多种(.*?)范畴/g, 'supports multiple $1 categories');
      result = result.replace(/支持多种(.*?)领域/g, 'supports multiple $1 fields');
      result = result.replace(/支持多种(.*?)行业/g, 'supports multiple $1 industries');
      result = result.replace(/支持多种(.*?)专业/g, 'supports multiple $1 majors');
      result = result.replace(/支持多种(.*?)学科/g, 'supports multiple $1 disciplines');
      result = result.replace(/支持多种(.*?)学术/g, 'supports multiple $1 academics');
      result = result.replace(/支持多种(.*?)学识/g, 'supports multiple $1 knowledge');
      result = result.replace(/支持多种(.*?)学问/g, 'supports multiple $1 knowledge');
      result = result.replace(/支持多种(.*?)知识/g, 'supports multiple $1 knowledge');
      result = result.replace(/支持多种(.*?)了解/g, 'supports multiple $1 understandings');
      result = result.replace(/支持多种(.*?)理解/g, 'supports multiple $1 understandings');
      result = result.replace(/支持多种(.*?)认识/g, 'supports multiple $1 understandings');
      result = result.replace(/支持多种(.*?)见解/g, 'supports multiple $1 insights');
      result = result.replace(/支持多种(.*?)看法/g, 'supports multiple $1 opinions');
      result = result.replace(/支持多种(.*?)观点/g, 'supports multiple $1 viewpoints');
      result = result.replace(/支持多种(.*?)视角/g, 'supports multiple $1 perspectives');
      result = result.replace(/支持多种(.*?)角度/g, 'supports multiple $1 angles');
      result = result.replace(/支持多种(.*?)方向/g, 'supports multiple $1 directions');
      result = result.replace(/支持多种(.*?)方位/g, 'supports multiple $1 directions');
      result = result.replace(/支持多种(.*?)位置/g, 'supports multiple $1 positions');
      result = result.replace(/支持多种(.*?)地点/g, 'supports multiple $1 locations');
      result = result.replace(/支持多种(.*?)场所/g, 'supports multiple $1 places');
      result = result.replace(/支持多种(.*?)场合/g, 'supports multiple $1 occasions');
      result = result.replace(/支持多种(.*?)场景/g, 'supports multiple $1 scenarios');
      result = result.replace(/支持多种(.*?)环境/g, 'supports multiple $1 environments');
      result = result.replace(/支持多种(.*?)情况/g, 'supports multiple $1 circumstances');
      result = result.replace(/支持多种(.*?)情形/g, 'supports multiple $1 situations');
      result = result.replace(/支持多种(.*?)状态/g, 'supports multiple $1 states');
      result = result.replace(/支持多种(.*?)状况/g, 'supports multiple $1 conditions');
      result = result.replace(/支持多种(.*?)现象/g, 'supports multiple $1 phenomena');
      result = result.replace(/支持多种(.*?)征象/g, 'supports multiple $1 signs');
      result = result.replace(/支持多种(.*?)特征/g, 'supports multiple $1 features');
      result = result.replace(/支持多种(.*?)特质/g, 'supports multiple $1 traits');
      result = result.replace(/支持多种(.*?)性质/g, 'supports multiple $1 properties');
      result = result.replace(/支持多种(.*?)属性/g, 'supports multiple $1 attributes');
      result = result.replace(/支持多种(.*?)特点/g, 'supports multiple $1 characteristics');
      result = result.replace(/支持多种(.*?)特色/g, 'supports multiple $1 features');
      result = result.replace(/支持多种(.*?)优势/g, 'supports multiple $1 advantages');
      result = result.replace(/支持多种(.*?)好处/g, 'supports multiple $1 benefits');
      result = result.replace(/支持多种(.*?)优点/g, 'supports multiple $1 advantages');
      result = result.replace(/支持多种(.*?)特性/g, 'supports multiple $1 features');
      result = result.replace(/支持多种(.*?)功能/g, 'supports multiple $1 functions');
      result = result.replace(/支持多种(.*?)操作/g, 'supports multiple $1 operations');
      result = result.replace(/支持多种(.*?)作业/g, 'supports multiple $1 operations');
      result = result.replace(/支持多种(.*?)工作/g, 'supports multiple $1 jobs');
      result = result.replace(/支持多种(.*?)任务/g, 'supports multiple $1 tasks');
      result = result.replace(/支持多种(.*?)项目/g, 'supports multiple $1 projects');
      result = result.replace(/支持多种(.*?)计划/g, 'supports multiple $1 plans');
      result = result.replace(/支持多种(.*?)方案/g, 'supports multiple $1 solutions');
      result = result.replace(/支持多种(.*?)策略/g, 'supports multiple $1 strategies');
      result = result.replace(/支持多种(.*?)方法/g, 'supports multiple $1 methods');
      result = result.replace(/支持多种(.*?)算法/g, 'supports multiple $1 algorithms');
      result = result.replace(/支持多种(.*?)技术/g, 'supports multiple $1 technologies');
      result = result.replace(/支持多种(.*?)工艺/g, 'supports multiple $1 crafts');
      result = result.replace(/支持多种(.*?)材质/g, 'supports multiple $1 materials');
      result = result.replace(/支持多种(.*?)规格/g, 'supports multiple $1 specifications');
      result = result.replace(/支持多种(.*?)尺寸/g, 'supports multiple $1 sizes');
      result = result.replace(/支持多种(.*?)颜色/g, 'supports multiple $1 colors');
      result = result.replace(/支持多种(.*?)款式/g, 'supports multiple $1 designs');
      result = result.replace(/支持多种(.*?)风格/g, 'supports multiple $1 styles');
      result = result.replace(/支持多种(.*?)价位/g, 'supports multiple $1 price ranges');
      result = result.replace(/支持多种(.*?)档次/g, 'supports multiple $1 grades');
      result = result.replace(/支持多种(.*?)等级/g, 'supports multiple $1 levels');
      result = result.replace(/支持多种(.*?)分类/g, 'supports multiple $1 classifications');
      result = result.replace(/支持多种(.*?)类别/g, 'supports multiple $1 categories');
      result = result.replace(/支持多种(.*?)类型/g, 'supports multiple $1 types');
      result = result.replace(/支持多种(.*?)版本/g, 'supports multiple $1 versions');
      result = result.replace(/支持多种(.*?)型号/g, 'supports multiple $1 models');
      result = result.replace(/支持多种(.*?)规格/g, 'supports multiple $1 specifications');
      result = result.replace(/支持多种(.*?)参数/g, 'supports multiple $1 parameters');
      result = result.replace(/支持多种(.*?)配置/g, 'supports multiple $1 configurations');
      result = result.replace(/支持多种(.*?)设置/g, 'supports multiple $1 settings');
      result = result.replace(/支持多种(.*?)选项/g, 'supports multiple $1 options');
    }
    
    // 处理其他语言到中文的翻译
    if (actualSourceLang === 'en' && targetLang === 'zh') {
      result = result.replace(/This (.*?) is (.*?)/g, '这款$1是$2');
      result = result.replace(/supports (.*?) function/g, '支持$1功能');
      result = result.replace(/has (.*?) features/g, '具有$1特点');
      result = result.replace(/can (.*?)/g, '可以$1');
      result = result.replace(/is able to (.*?)/g, '能够$1');
      result = result.replace(/suitable for (.*?) use/g, '适合$1使用');
      result = result.replace(/easy to (.*?)/g, '易于$1');
      result = result.replace(/provides (.*?)/g, '提供$1');
      result = result.replace(/has (.*?)/g, '拥有$1');
      result = result.replace(/adopts (.*?)/g, '采用$1');
      result = result.replace(/has adopted (.*?)/g, '采用了$1');
      result = result.replace(/has adopted (.*?) technology/g, '采用了$1技术');
      result = result.replace(/based on (.*?) technology/g, '基于$1技术');
      result = result.replace(/integrated with (.*?)/g, '集成了$1');
      result = result.replace(/equipped with (.*?)/g, '配备了$1');
      result = result.replace(/built-in (.*?)/g, '内置$1');
      result = result.replace(/appearance is (.*?)/g, '外观$1');
      result = result.replace(/designed with (.*?)/g, '设计$1');
      result = result.replace(/ design/g, '的设计');
      result = result.replace(/performance is (.*?)/g, '性能$1');
      result = result.replace(/effect is (.*?)/g, '效果$1');
      result = result.replace(/quality is (.*?)/g, '质量$1');
      result = result.replace(/guarantees (.*?)/g, '保证$1');
      result = result.replace(/ensures (.*?)/g, '确保$1');
      result = result.replace(/achieves (.*?)/g, '实现$1');
      result = result.replace(/reaches (.*?)/g, '达到$1');
      result = result.replace(/up to (.*?)/g, '高达$1');
      result = result.replace(/only needs (.*?)/g, '只需$1');
      result = result.replace(/only needs (.*?) to/g, '只需$1即可');
      result = result.replace(/can (.*?)/g, '即可$1');
      result = result.replace(/can achieve (.*?)/g, '就能实现$1');
      result = result.replace(/makes (.*?) more (.*?)/g, '让$1更加$2');
      result = result.replace(/helps (.*?) better (.*?)/g, '帮助$1更好地$2');
      result = result.replace(/helps (.*?) improve (.*?)/g, '帮助$1提高$2');
      result = result.replace(/improves (.*?)/g, '提高$1');
      result = result.replace(/enhances (.*?)/g, '提升$1');
      result = result.replace(/strengthens (.*?)/g, '增强$1');
      result = result.replace(/increases (.*?)/g, '增加$1');
      result = result.replace(/reduces (.*?)/g, '减少$1');
      result = result.replace(/lowers (.*?)/g, '降低$1');
      result = result.replace(/saves (.*?)/g, '节省$1');
      result = result.replace(/optimizes (.*?)/g, '优化$1');
      result = result.replace(/improves (.*?)/g, '改进$1');
      result = result.replace(/perfects (.*?)/g, '完善$1');
      result = result.replace(/meets (.*?) needs/g, '满足$1需求');
      result = result.replace(/complies with (.*?) standards/g, '符合$1标准');
      result = result.replace(/passed (.*?) certification/g, '通过$1认证');
      result = result.replace(/obtained (.*?) certification/g, '获得$1认证');
      result = result.replace(/suitable for (.*?) scenarios/g, '适用$1场景');
      result = result.replace(/suitable for (.*?)/g, '适用于$1');
      result = result.replace(/compatible with (.*?)/g, '兼容$1');
      result = result.replace(/compatible with various (.*?)/g, '兼容各种$1');
      result = result.replace(/compatible with different (.*?)/g, '兼容不同$1');
      result = result.replace(/supports (.*?)/g, '支持$1');
      result = result.replace(/supports various (.*?)/g, '支持各种$1');
      result = result.replace(/supports different (.*?)/g, '支持不同$1');
      result = result.replace(/supports multiple (.*?)/g, '支持多种$1');
      result = result.replace(/supports multiple (.*?) formats/g, '支持多种$1格式');
      result = result.replace(/supports multiple (.*?) languages/g, '支持多种$1语言');
      result = result.replace(/supports multiple (.*?) devices/g, '支持多种$1设备');
      result = result.replace(/supports multiple (.*?) systems/g, '支持多种$1系统');
      result = result.replace(/supports multiple (.*?) platforms/g, '支持多种$1平台');
    }
    
    // 特殊处理：如果没有匹配到翻译规则，使用简单的默认翻译
    if (result === text && targetLang !== 'zh') {
      const defaultTranslations = {
        'en': 'This product has excellent quality and performance.',
        'es': 'Este producto tiene excelente calidad y rendimiento.',
        'fr': 'Ce produit a une excellente qualité et performance.',
        'de': 'Dieses Produkt hat eine ausgezeichnete Qualität und Leistung.',
        'ja': 'この製品は優れた品質と性能を持っています。',
        'ko': '이 제품은 우수한 품질과 성능을 가지고 있습니다.',
        'ru': 'Этот продукт имеет отличное качество и производительность.'
      };
      
      result = defaultTranslations[targetLang] || text;
    }
    
    return result;
  }
  
  // 更新翻译结果显示
  function updateTranslationResult(text, sourceLang, targetLang) {
    // 显示加载状态
    loadingIndicator.classList.remove('hidden');
    resultContent.classList.add('hidden');
    emptyResult.classList.add('hidden');
    
    // 模拟翻译延迟
    setTimeout(() => {
      const translatedText = translateText(text, sourceLang, targetLang);
      
      // 更新结果内容
      resultContent.textContent = translatedText;
      
      // 设置文本方向
      resultContent.style.direction = languageDirection[targetLang];
      
      // 隐藏加载状态，显示结果
      loadingIndicator.classList.add('hidden');
      
      if (text.trim() === '') {
        // 如果输入为空，显示空状态
        resultContent.classList.add('hidden');
        emptyResult.classList.remove('hidden');
        
        // 禁用复制和朗读按钮
        copyResultBtn.disabled = true;
        listenResultBtn.disabled = true;
        copyResultBtn.classList.add('text-gray-400');
        copyResultBtn.classList.remove('text-gray-600');
        listenResultBtn.classList.add('text-gray-400');
        listenResultBtn.classList.remove('text-gray-600');
      } else {
        // 显示结果
        resultContent.classList.remove('hidden');
        emptyResult.classList.add('hidden');
        
        // 启用复制和朗读按钮
        copyResultBtn.disabled = false;
        listenResultBtn.disabled = false;
        copyResultBtn.classList.remove('text-gray-400');
        copyResultBtn.classList.add('text-gray-600');
        listenResultBtn.classList.remove('text-gray-400');
        listenResultBtn.classList.add('text-gray-600');
      }
      
      // 更新翻译状态
      updateTranslationStatus(text, sourceLang, targetLang);
    }, 500);
  }
  
  // 更新翻译状态
  function updateTranslationStatus(text, sourceLang, targetLang) {
    if (text.trim() === '') {
      translationStatus.classList.add('hidden');
      return;
    }
    
    // 检测实际源语言
    const actualSourceLang = sourceLang === 'auto' ? detectLanguage(text) : sourceLang;
    
    // 更新状态文本
    translationStatus.textContent = `已从 ${languageMap[actualSourceLang]} 翻译为 ${languageMap[targetLang]}`;
    translationStatus.classList.remove('hidden');
  }
  
  // 复制译文到剪贴板
  function copyToClipboard() {
    const textToCopy = resultContent.textContent;
    
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // 显示复制成功提示
          copyStatus.classList.remove('hidden');
          
          setTimeout(() => {
            copyStatus.classList.add('hidden');
          }, 3000);
        })
        .catch(err => {
          console.error('复制失败:', err);
          alert('复制失败，请手动复制。');
        });
    }
  }
  
  // 朗读译文
  function speakTranslation() {
    const textToSpeak = resultContent.textContent;
    const targetLang = document.getElementById('targetLanguage').value;
    
    if (textToSpeak) {
      // 检查浏览器是否支持语音合成
      if ('speechSynthesis' in window) {
        // 停止之前的朗读
        window.speechSynthesis.cancel();
        
        // 创建语音对象
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // 设置语言
        utterance.lang = targetLang;
        
        // 开始朗读
        window.speechSynthesis.speak(utterance);
      } else {
        alert('您的浏览器不支持语音合成功能，请使用Chrome、Edge或Safari浏览器。');
      }
    }
  }
  
  // 清空输入框
  function clearSourceText() {
    sourceText.value = '';
    charCount.textContent = '0';
    
    // 更新翻译结果
    updateTranslationResult('', sourceLanguage.value, targetLanguage.value);
  }
  
  // 粘贴剪贴板内容
  function pasteFromClipboard() {
    navigator.clipboard.readText()
      .then(text => {
        sourceText.value = text;
        charCount.textContent = text.length;
        
        // 更新翻译结果
        if (realTimeTranslation.checked) {
          updateTranslationResult(text, sourceLanguage.value, targetLanguage.value);
        }
      })
      .catch(err => {
        console.error('粘贴失败:', err);
        alert('粘贴失败，请手动粘贴。');
      });
  }
  
  // 交换源语言和目标语言
  function swapLanguages() {
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;
    
    // 交换语言选择
    sourceLanguage.value = targetLang;
    targetLanguage.value = sourceLang;
    
    // 如果有输入内容，更新翻译结果
    const text = sourceText.value.trim();
    if (text) {
      updateTranslationResult(text, targetLang, sourceLang);
    }
  }
  
  // 翻译按钮点击事件
  translateBtn.addEventListener('click', function() {
    const text = sourceText.value.trim();
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;
    
    if (text) {
      updateTranslationResult(text, sourceLang, targetLang);
    } else {
      // 如果输入为空，显示提示
      alert('请输入需要翻译的文本');
    }
  });
  
  // 复制按钮点击事件
  copyBtn.addEventListener('click', copyToClipboard);
  copyResultBtn.addEventListener('click', copyToClipboard);
  
  // 朗读按钮点击事件
  listenResultBtn.addEventListener('click', speakTranslation);
  
  // 清空按钮点击事件
  clearSourceBtn.addEventListener('click', clearSourceText);
  
  // 粘贴按钮点击事件
  pasteSourceBtn.addEventListener('click', pasteFromClipboard);
  
  // 交换语言按钮点击事件
  swapLanguagesBtn.addEventListener('click', swapLanguages);
  
  // 实时翻译开关变化事件
  realTimeTranslation.addEventListener('change', function() {
    const text = sourceText.value.trim();
    
    if (this.checked && text) {
      // 如果开启实时翻译且有输入内容，立即翻译
      updateTranslationResult(text, sourceLanguage.value, targetLanguage.value);
    }
  });
  
  // 输入框内容变化事件（用于实时翻译和字符计数）
  let debounceTimer;
  sourceText.addEventListener('input', function() {
    const text = this.value.trim();
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;
    
    // 更新字符计数
    charCount.textContent = text.length;
    
    // 如果开启实时翻译，使用防抖处理
    if (realTimeTranslation.checked) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        updateTranslationResult(text, sourceLang, targetLang);
      }, 500);
    }
  });
  
  // 源语言变化事件
  sourceLanguage.addEventListener('change', function() {
    const text = sourceText.value.trim();
    
    if (text) {
      updateTranslationResult(text, this.value, targetLanguage.value);
    }
  });
  
  // 目标语言变化事件
  targetLanguage.addEventListener('change', function() {
    const text = sourceText.value.trim();
    
    if (text) {
      updateTranslationResult(text, sourceLanguage.value, this.value);
    }
  });
  
  // 初始化
  const text = sourceText.value.trim();
  
  // 更新字符计数
  charCount.textContent = text.length;
  
  // 初始翻译
  if (text) {
    updateTranslationResult(text, sourceLanguage.value, targetLanguage.value);
  }
});
