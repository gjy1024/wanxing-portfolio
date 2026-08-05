import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Menu, Radio, Search, X } from 'lucide-react';

import AccordionGallery from './components/reactbits/AccordionGallery/AccordionGallery';
import BorderGlow from './components/reactbits/BorderGlow/BorderGlow';
import ClickSpark from './components/reactbits/ClickSpark/ClickSpark';
import LineSidebar from './components/reactbits/LineSidebar/LineSidebar';
import Particles from './components/reactbits/Particles/Particles';
import ParticleText from './components/reactbits/ParticleText/ParticleText';
import SoftAurora from './components/reactbits/SoftAurora/SoftAurora';
import StarBorder from './components/reactbits/StarBorder/StarBorder';
import poems from './poems';

const resolveAsset = (path) => path?.startsWith('/assets/')
  ? `${import.meta.env.BASE_URL}${path.slice(1)}`
  : path;

const sections = [
  {
    id: 'profile',
    nav: '个人简介',
    label: '问荇言·本我',
    image: '/assets/gallery/profile.webp',
    eyebrow: 'PROFILE / BEIHANG / COMMUNICATION ENGINEERING',
    title: '问荇言·本我',
    subtitle: '路漫漫其修远兮，吾将上下而求索',
    metrics: [
      ['通信工程', '专业方向'],
      ['2024级', '当前阶段'],
      ['C / Python', '编程基础'],
    ],
    groups: [
      {
        number: '01',
        title: '学习与技术基础',
        summary: '以通信工程为主轴，持续补充人工智能、嵌入式系统和工程实现能力。',
        items: [
          '关注通信系统、信号处理、嵌入式控制与人工智能的交叉应用。',
          '使用 Python、C、Git 与 LaTeX，重视从建模到实验验证的完整过程。',
          '具备 PyTorch 强化学习训练、多智能体建模和工程文档写作经验。',
        ],
      },
      {
        number: '02',
        title: '组织与公共表达',
        summary: '在技术学习之外承担组织、宣传和新生支持工作，训练协作与表达能力。',
        items: [
          '北航 2418112161 联合团支部团支书。',
          '北航“微言航语”宣传部剪辑师。',
          '北航 25 级专业梦拓。',
        ],
      },
      {
        number: '03',
        title: '阶段性荣誉',
        summary: '荣誉不是终点，更适合作为阶段投入和团队协作的记录。',
        items: [
          '2024—2025、2025—2026 学年北航校级优秀团员。',
          '2024—2025、2025—2026 学年优秀学生干部。',
          '2024 年新生奖学金二等奖。',
          '2024—2025 学年学习奖学金二等奖。',
          '2026 年优秀专业梦拓。',
          '北航第 62 届校运会本科组女子接力赛金牌。',
        ],
      },
      {
        number: '04',
        title: '实践坐标',
        summary: '把科研、竞赛和日常学习放进同一条长期能力曲线，而不是彼此孤立的成果列表。',
        items: [
          '科研侧重 6G ISAC、多智能体强化学习、路径规划与跨层优化。',
          '工程侧重 UWB 无线定位、STM32 嵌入式控制、传感器融合与系统联调。',
          '持续整理可复现实验、设计报告与复盘，让过程本身成为作品。',
        ],
      },
    ],
    sourceNote: '内容依据个人资料整理；仅展示适合公开的个人方向与阶段经历。',
  },
  {
    id: 'research',
    nav: '科研论文',
    label: '定风波·格物',
    image: '/assets/gallery/research.webp',
    eyebrow: 'RESEARCH / 6G / MULTI-AGENT REINFORCEMENT LEARNING',
    title: '定风波·格物',
    subtitle: '从 6G 通感一体化物理建模出发，研究多智能体在复杂约束下的协同规划与决策。',
    metrics: [
      ['1st Author', '作者角色'],
      ['AA-MAPPO', '核心方法'],
      ['IEEE ICCECT', '录用会议'],
    ],
    featured: {
      label: 'SELECTED PUBLICATION',
      title: 'UAV Swarm Path Planning Based on Attention Mechanism and Reinforcement Learning in 6G Networks',
      meta: 'IEEE ICCECT 2026 · pp. 147–153',
      href: 'https://doi.org/10.1109/ICCECT68671.2026.11565262',
      linkLabel: 'DOI 10.1109/ICCECT68671.2026.11565262',
    },
    media: [
      {
        src: '/assets/research/uav-scenario.jpeg',
        alt: '6G 通感一体化无人机集群协作场景示意图',
        title: '6G ISAC 协同场景',
        caption: '在三维空域中同时考虑用户服务、雷达感知、链路质量与安全间距。',
      },
      {
        src: '/assets/research/aa-mappo-pipeline.png',
        alt: 'AA-MAPPO 算法训练与决策流程图',
        title: 'AA-MAPPO 决策链路',
        caption: 'CTDE 框架结合多头注意力、PPO 截断和复合奖励完成策略更新。',
      },
      {
        src: '/assets/research/reward-curves.png',
        alt: 'AA-MAPPO 与基线算法的奖励收敛曲线',
        title: '奖励收敛与消融对比',
        caption: '通过 Standard MAPPO 等基线观察注意力机制和物理约束的贡献。',
      },
      {
        src: '/assets/research/swarm-trajectories.png',
        alt: '无人机集群协同轨迹与用户感知覆盖图',
        title: '协同轨迹与感知覆盖',
        caption: '轨迹可视化用于核对通信、感知、安全与能耗之间的实际折中。',
      },
    ],
    groups: [
      {
        number: '01',
        title: '问题与建模',
        summary: '把通信容量、感知精度、飞行能耗与碰撞规避放入统一的联合优化问题。',
        items: [
          '面向 6G 空天地一体化网络（SAGIN）与通感一体化（ISAC）场景。',
          '以 DEC-POMDP 描述多无人机协作，纳入毫米波链路、雷达双向衰减与 CRB 感知下界。',
          '连续动作空间与复合奖励函数共同约束轨迹平滑度、通信质量与安全距离。',
        ],
      },
      {
        number: '02',
        title: 'AA-MAPPO 算法架构',
        summary: '在 CTDE 框架中引入多头注意力，让智能体从高维局部观测中筛选关键实体。',
        items: [
          'Actor 基于局部观测输出连续加速度动作，Critic 在训练期使用全局状态评估长期回报。',
          'Query-Key-Value 注意力动态提高高风险邻机与弱链路用户的特征权重。',
          'PPO 截断和 GAE 限制策略更新幅度，复合奖励同时编码通信、感知、碰撞与能耗。',
        ],
      },
      {
        number: '03',
        title: '实验与消融设计',
        summary: '从“算法是否有效”进一步追问“每个模块为什么必要”。',
        items: [
          '独立完成 Python 3.8 + PyTorch 训练代码、环境交互、复合奖励函数与实验脚本。',
          '设置 Standard MAPPO、No-Clip MAPPO 与 Naive Reward MAPPO 作为基线与消融组。',
          '比较累计奖励、价值损失、策略概率比、分布熵和实际轨迹，验证收敛与稳定性。',
        ],
      },
      {
        number: '04',
        title: '结果与物理解释',
        summary: '将底层训练曲线重新映射到无人机的空间行为，避免只用单一奖励值判断优劣。',
        items: [
          '注意力增强策略能过滤随机干扰，并在通信质量、感知精度和安全距离之间形成更稳定折中。',
          '去除物理复合奖励后出现目标聚集与碰撞风险；去除 PPO 截断后出现轨迹震荡和越界。',
          '协同轨迹展示了近距感知覆盖、外围中继与安全间距之间的动态分工。',
        ],
      },
    ],
    researchArchive: [
      {
        index: 'R-02',
        title: '面向多机协同的 3DGS 三维重建与自组网路由优化',
        meta: '独立研究 · 科研课堂核心课题 · 2025.09—2025.11',
        description: '把视觉重建任务和高速移动 MANET 的通信资源调度放入同一个跨层优化视角。',
        points: [
          '基于 COLMAP 完成 SfM 稀疏点云构建，并部署分析 3D Gaussian Splatting 实时渲染流程。',
          '针对 OLSR 仅依赖跳数选路的局限，将路由选择建模为 MDP，提出 QL-OLSR 改进方案。',
          '在真实桌面场景实现 PSNR > 28 dB、30 FPS 渲染，并提出内容感知型跨层路由构想。',
        ],
      },
      {
        index: 'R-03',
        title: '基于 STM32 与多传感器融合的自动驾驶底盘控制系统',
        meta: '独立开发 · 核心专业课设 · 2025.09—2025.11',
        description: '围绕闭环控制、姿态解算、颜色识别和非阻塞调度完成嵌入式系统验证。',
        points: [
          '配置 ADC 多通道扫描 + DMA，实现红外传感器 50 kHz 高频无阻塞采样。',
          '驱动 MPU6050/DMP，解决 Yaw 角跨 ±180° 跳变，并结合差速模型实现稳定转向。',
          '直线循迹偏差小于 2 cm，单次 90° 闭环转弯误差小于 3°。',
        ],
      },
      {
        index: 'R-04',
        title: '时空注意力 MAPPO 的 6G 通感一体化自动驾驶协同决策',
        meta: '项目队长 · 创新创业类课程项目 · 2026.04',
        description: '面向人车混行、交叉口盲区和 6G ISAC 噪声，建立“感知—认知—行动”安全闭环。',
        points: [
          '以 GRU + Multi-Head Attention 提取时空特征，推断不可预测的人类驾驶行为。',
          '构建 TTC 双层 Safety Shield，在高风险状态下用运动学约束覆盖不安全动作。',
          '通过 Standard MAPPO、去 Attention、去 GRU、去复合奖励等消融组验证模块贡献。',
        ],
        media: [
          { src: '/assets/research/autodrive/closed-loop.png', alt: '6G ISAC 自动驾驶感知认知行动闭环架构图' },
          { src: '/assets/research/autodrive/ablation-curves.png', alt: '时空注意力 MAPPO 消融实验奖励曲线' },
        ],
      },
    ],
    innovationPlan: {
      title: '基于 Unity3D 与 AirSim 的多无人机仿真平台设计',
      meta: '大学生创新训练计划 · 在研计划 · 多无人机仿真与动态决策',
      summary: '以 Unity3D 的三维场景能力和 AirSim 的飞行、物理与传感器仿真为底座，构建支持多机协同、通信模拟和动态任务的高保真实验平台，为集群算法提供安全、可扩展、可复现的验证环境。',
      objective: '面向复杂动态环境中的多无人机集群，研究路径规划、任务分配、协同通信、实时决策与安全保障，使集群能够在任务变化后重新分组、重新规划并完成闭环任务。',
      tracks: [
        ['01 / 仿真环境', '在 Unity3D / Unreal Engine 场景中配置地形、建筑、天气与多架无人机模型，并接入位置、速度、姿态等状态和多类传感器数据。'],
        ['02 / 控制与通信', '比较集中式、分布式与混合式集群控制，纳入通信设备、数据链路与协议对协同行为的影响。'],
        ['03 / 动态决策', '结合行为、规则与学习型模型，探索深度强化学习驱动的路径规划、任务分配、冲突消解和环境适应。'],
        ['04 / 实验闭环', '通过 Python 客户端连接 AirSim 仿真服务器，完成任务设定、策略执行、状态采集、结果分析与循环验证。'],
      ],
      highlights: [
        '多智能体协同决策：在任务分配与冲突处理中形成可解释的协作机制。',
        '实时响应：通过算法与系统联调兼顾动态环境中的决策速度和飞行安全。',
        '模块化扩展：将场景、机体、传感器、控制算法和评估流程解耦，便于后续升级。',
      ],
    },
    sourceNote: '图表来自论文原稿；页面仅呈现方法、验证和结果的摘要级信息。',
  },
  {
    id: 'competition',
    nav: '科技竞赛',
    label: '行香子·天枢',
    image: '/assets/gallery/competition.webp',
    eyebrow: 'COMPETITION / EMBEDDED SYSTEMS / WIRELESS SENSING',
    title: '行香子·天枢',
    subtitle: '无线测距+定位算法+嵌入式控制+现场验证=系统闭环。',
    metrics: [
      ['2.18 mm', 'KF 径向标准差'],
      ['4 × UWB', '定位基站'],
      ['100%', '主机回归通过'],
    ],
    featured: {
      label: 'TI CUP / 2026',
      title: '基于无线通信的数字钥匙实验系统',
      meta: '“TI 杯”北京市大学生电子设计竞赛二等奖',
    },
    media: [
      {
        src: '/assets/competition/system-flow.png',
        alt: 'UWB 数字钥匙系统组成与信息流图',
        title: '系统组成与信息流',
        caption: '从 TAG 与四基站测距，到 G474 定位、认证、区域判决和声光输出。',
      },
      {
        src: '/assets/competition/positioning-model.png',
        alt: '门锁坐标系、四基站位置与方向角定义图',
        title: '四基站定位几何',
        caption: '以门锁中心为原点，通过四路距离形成二维超定约束并独立解算方向角。',
      },
      {
        src: '/assets/competition/key-modification.png',
        alt: '完成便携化改装的 UWB 数字钥匙实物',
        title: '数字钥匙改装',
        caption: '将 TAG 测距节点完成便携化连接与固定，作为携带身份信息的无线数字钥匙。',
        photo: true,
      },
      {
        src: '/assets/competition/prototype.jpg',
        alt: 'UWB 数字钥匙系统完整实物与测试区域',
        title: '完整实物系统',
        caption: '门锁端控制器、四基站与标定场地共同完成距离、角度、ID 和边界状态验证。',
        photo: true,
      },
      {
        src: '/assets/competition/display.jpg',
        alt: '数字钥匙系统 OLED 状态显示实物',
        title: '状态显示与诊断',
        caption: 'OLED 展示身份、距离、角度、区域与门锁状态，方便现场标定和异常排查。',
        photo: true,
      },
      {
        src: '/assets/competition/wiring.jpg',
        alt: '门锁控制器与 OLED 模块连接实物图',
        title: '控制链路连接',
        caption: '控制器通过非阻塞串口接收测距数据，并驱动显示与声光反馈模块。',
        photo: true,
      },
    ],
    groups: [
      {
        number: '01',
        title: '系统方案',
        summary: '一枚 UWB 数字钥匙、四个基站与 NUCLEO-G474RE 控制器构成完整门锁感知系统。',
        items: [
          'A0 汇总 TAG ID、帧序号和四路距离，以 115200 bit/s 串口送入控制器。',
          'G474 完成协议重同步、距离校准、五点中值、鲁棒 WLS 与二维匀速卡尔曼滤波。',
          '通过拨码设置 4 位期望 ID，并以 OLED、三色灯和蜂鸣器反馈区域与门锁状态。',
        ],
      },
      {
        number: '02',
        title: '算法与安全',
        summary: '控制链与显示链分离：WLS 保证边界响应，卡尔曼结果保证读数稳定。',
        items: [
          '四基站超定约束配合 Huber 鲁棒权重，输出位置、RMS 残差与逐基站诊断信息。',
          '1 m 与 2 m 边界设置 5 cm 迟滞，降低边界附近状态反复跳变。',
          'ID 不匹配、通信超时、定位残差过大或测量失效时强制闭锁。',
        ],
      },
      {
        number: '03',
        title: '测试结果',
        summary: '不以单帧显示判断性能，通过连续日志、边界往返与异常注入形成证据链。',
        items: [
          '0.67 m 静止点连续采集 29.5 s、128 帧：WLS 径向标准差 2.44 mm，KF 为 2.18 mm。',
          '方向角测试覆盖 −45° 至 +45°；ID 正确、错误及关键链路失效场景均完成验证。',
          '主机回归测试 3 项全部通过，1 m 与 2 m 边界均实现稳定切换。',
        ],
      },
      {
        number: '04',
        title: '其他竞赛记录',
        summary: '后续可逐项补充项目图、个人分工、仓库链接与复盘。',
        items: [
          '挑战杯“青振京郊”2026 年首都大学生课外学术科技作品竞赛市级二等奖。',
          '挑战杯“青振京郊”2025 年市级三等奖；“青创北京”2025 年校级三等奖。',
          '北航冯如杯第五届电子信息智能硬件创新创意大赛命题类三等奖。',
        ],
      },
    ],
    sourceNote: '数据依据数字钥匙实验系统正式设计报告与测试结果整理。',
  },
  {
    id: 'poetry',
    nav: '个人诗集',
    label: '蝶恋花·诗意',
    image: '/assets/gallery/poetry.png',
    eyebrow: 'POETRY / MEMORY / INNER LANDSCAPE',
    title: '蝶恋花·诗意',
    subtitle: '技术记录世界的结构，诗歌保留感受的温度。这一页将作为个人表达的克制支线。',
    metrics: [
      ['卷一', '待整理'],
      ['四时', '建议分类'],
      ['原稿', '等待补充'],
    ],
    groups: [
      {
        number: '01',
        title: '诗稿目录',
        summary: '目前工作区尚未发现诗歌原稿，因此不虚构具体作品。',
        items: [
          '建议每首诗提供标题、正文、创作日期和一句可选的写作背景。',
          '可以按“春信、长夏、清秋、冬夜”或真实主题重新分卷。',
          '如有手写稿或照片，也可以作为作品页的首屏视觉资料。',
        ],
      },
      {
        number: '02',
        title: '展示方式',
        summary: '诗歌页将保持足够留白，以单篇阅读为主，不与技术内容争夺视觉层级。',
        items: [
          '目录页只展示标题、日期和两行节选。',
          '作品页使用窄栏正文，并保留上一首、下一首导航。',
          '兴趣内容不进入首页主叙事，只通过这一个入口访问。',
        ],
      },
    ],
    sourceNote: '等待诗歌原稿后再建立真实作品目录。',
  },
];

const researchSection = sections.find((section) => section.id === 'research');
const [reconstructionProject, chassisProject, autonomyProject] = researchSection.researchArchive;

const researchTopics = [
  {
    id: 'aa-mappo',
    index: 'R-01',
    category: 'FEATURED PAPER / 6G ISAC / MARL',
    status: 'IEEE ICCECT 2026',
    title: researchSection.featured.title,
    shortTitle: 'AA-MAPPO 无人机集群路径规划',
    subtitle: '在 6G 通感一体化约束下，以注意力增强的多智能体强化学习完成无人机集群协同规划。',
    keywords: ['AA-MAPPO', 'CTDE', 'ISAC', 'UAV Swarm'],
    metrics: researchSection.metrics,
    featured: researchSection.featured,
    media: researchSection.media,
    groups: researchSection.groups,
    sourceNote: '核心论文主题；图表来自论文原稿，页面呈现方法、验证和结果的摘要级信息。',
  },
  {
    id: '3dgs-ql-olsr',
    index: reconstructionProject.index,
    category: '3D RECONSTRUCTION / MANET / CROSS-LAYER',
    status: '独立研究 · 科研课堂核心课题',
    title: reconstructionProject.title,
    shortTitle: '3DGS 三维重建与 QL-OLSR',
    subtitle: reconstructionProject.description,
    keywords: ['3DGS', 'COLMAP', 'QL-OLSR', 'MANET'],
    metrics: [
      ['> 28 dB', '场景重建 PSNR'],
      ['30 FPS', '实时渲染目标'],
      ['QL-OLSR', '路由改进方向'],
    ],
    groups: [
      {
        number: '01',
        title: '三维重建流程',
        summary: '从图像序列、相机位姿到可实时渲染的高斯场景表示，建立完整视觉重建链路。',
        items: [
          '使用 COLMAP 完成特征匹配、相机标定、SfM 位姿恢复与稀疏点云构建。',
          '以稀疏点云初始化 3D Gaussian Splatting，分析位置、尺度、旋转、不透明度与球谐颜色参数。',
          '以 PSNR 和实时帧率分别观察重建质量与在线应用可行性。',
        ],
      },
      {
        number: '02',
        title: '自组网路由问题',
        summary: '高速移动节点使链路质量持续变化，仅以跳数作为 OLSR 路由依据难以反映真实传输代价。',
        items: [
          '将候选路由选择抽象为 MDP，使策略能够结合链路状态与网络变化更新转发偏好。',
          '以 Q-Learning 改进 OLSR 的下一跳选择，保留协议拓扑发现能力并增强动态适应性。',
          '把时延、可靠性、稳定性与路由开销作为后续实验需要共同核对的指标。',
        ],
      },
      {
        number: '03',
        title: '跨层协同构想',
        summary: '把视觉任务的重要程度传递到网络层，让有限带宽优先服务更关键的重建数据。',
        items: [
          '区分关键帧、普通帧和冗余数据，探索内容感知型传输优先级。',
          '将渲染质量下降与网络拥塞联系起来，形成应用层质量与路由动作之间的反馈。',
          '为多无人机协同建图中的分布式采集、传输和融合提供可扩展接口。',
        ],
      },
      {
        number: '04',
        title: '验证与边界',
        summary: '当前结果用于验证研究路线的可行性，后续仍需在真实移动网络和多节点压力下扩展实验。',
        items: reconstructionProject.points,
      },
    ],
    sourceNote: '独立研究主题；当前展示重建与路由优化的阶段性方法和验证范围。',
  },
  {
    id: 'stm32-chassis',
    index: chassisProject.index,
    category: 'EMBEDDED CONTROL / SENSOR FUSION',
    status: '独立开发 · 核心专业课设',
    title: chassisProject.title,
    shortTitle: 'STM32 多传感器自主底盘',
    subtitle: chassisProject.description,
    keywords: ['STM32', 'DMA', 'MPU6050', 'Closed-loop'],
    metrics: [
      ['50 kHz', '红外采样频率'],
      ['< 2 cm', '直线循迹偏差'],
      ['< 3°', '90° 转弯误差'],
    ],
    groups: [
      {
        number: '01',
        title: '实时采集架构',
        summary: '用 DMA 与非阻塞调度分离传感器采集和控制计算，避免主循环被单一外设占用。',
        items: [
          '配置 ADC 多通道扫描与 DMA 循环搬运，实现红外阵列 50 kHz 采样。',
          '将采集、滤波、状态判断和电机输出拆分为不同更新节拍。',
          '通过连续状态量而非单次阈值判断循迹偏差，提高噪声环境下的稳定性。',
        ],
      },
      {
        number: '02',
        title: '姿态与运动模型',
        summary: '结合惯性姿态和差速底盘模型，为直线保持与定角转弯提供统一状态参考。',
        items: [
          '驱动 MPU6050/DMP 获取姿态，处理 Yaw 角跨 ±180° 时的连续化问题。',
          '依据轮距、轮速和目标角度构建差速转向控制逻辑。',
          '利用闭环误差逐步收敛，而不是依赖固定延时完成转弯。',
        ],
      },
      {
        number: '03',
        title: '任务状态机',
        summary: '把循迹、颜色识别、转向和停车组织为可复核的事件序列。',
        items: [
          '用明确的状态入口、退出条件和超时保护约束各任务阶段。',
          '将颜色检测结果与运动状态解耦，减少识别抖动直接影响电机输出。',
          '保留串口诊断信息，便于复现实验并定位传感器或控制异常。',
        ],
      },
      {
        number: '04',
        title: '精度验证',
        summary: '通过重复直线与定角动作验证控制闭环，而不是只展示单次成功演示。',
        items: chassisProject.points,
      },
    ],
    sourceNote: '工程研究主题；指标来自阶段性系统验证。',
  },
  {
    id: 'autonomy-mappo',
    index: autonomyProject.index,
    category: 'AUTONOMOUS DRIVING / 6G ISAC / MARL',
    status: '项目队长 · 创新创业类课程项目',
    title: autonomyProject.title,
    shortTitle: '时空注意力 MAPPO 自动驾驶',
    subtitle: autonomyProject.description,
    keywords: ['GRU', 'Multi-Head Attention', 'TTC', 'Safety Shield'],
    metrics: [
      ['GRU + MHA', '时空特征编码'],
      ['TTC', '风险判据'],
      ['MAPPO', '协同决策框架'],
    ],
    media: [
      {
        ...autonomyProject.media[0],
        title: '感知—认知—行动闭环',
        caption: '在 6G ISAC 感知噪声与人车混行场景中连接状态估计、风险判断和策略动作。',
      },
      {
        ...autonomyProject.media[1],
        title: '消融实验奖励曲线',
        caption: '比较注意力、GRU 与复合奖励移除后的训练表现，核对各模块贡献。',
      },
    ],
    groups: [
      {
        number: '01',
        title: '场景与风险建模',
        summary: '面向人车混行、交叉口盲区和通信感知噪声，构建可训练的协同驾驶环境。',
        items: [
          '将车辆局部观测、邻车状态、道路结构与感知不确定性共同纳入状态空间。',
          '用 TTC 等风险量刻画碰撞迫近程度，使安全约束具备明确物理含义。',
          '把通行效率、舒适性、协同收益与安全惩罚组合为分层奖励信号。',
        ],
      },
      {
        number: '02',
        title: '时空特征提取',
        summary: 'GRU 建模历史演化，多头注意力筛选当前交互对象，减少高维观测中的无关干扰。',
        items: [
          '以连续观测序列编码驾驶意图和速度变化趋势。',
          '对邻车、行人和道路约束分配动态权重，突出高风险参与者。',
          '在 CTDE 训练框架中共享全局信息，执行阶段仍保持局部决策。',
        ],
      },
      {
        number: '03',
        title: '双层安全屏障',
        summary: '策略负责常规协同，安全层在高风险状态下以运动学约束覆盖不安全动作。',
        items: [
          '第一层根据 TTC 和安全距离识别需要干预的状态。',
          '第二层生成满足车辆运动学与道路边界的替代动作。',
          '记录干预比例和触发原因，用于区分策略能力与安全层兜底效果。',
        ],
      },
      {
        number: '04',
        title: '消融与解释',
        summary: '通过移除关键模块，判断性能变化来自时序建模、注意力筛选还是奖励约束。',
        items: autonomyProject.points,
      },
    ],
    sourceNote: '课程研究主题；页面将系统架构、消融思路与安全闭环分开呈现。',
  },
  {
    id: 'airsim-platform',
    index: 'R-05',
    category: 'ONGOING PLAN / MULTI-UAV SIMULATION',
    status: researchSection.innovationPlan.meta,
    title: researchSection.innovationPlan.title,
    shortTitle: 'Unity3D / AirSim 多无人机平台',
    subtitle: researchSection.innovationPlan.summary,
    keywords: ['Unity3D', 'AirSim', 'Multi-UAV', 'Python'],
    metrics: [
      ['Unity3D', '三维场景构建'],
      ['AirSim', '物理与传感器仿真'],
      ['Python', '客户端控制接口'],
    ],
    groups: [
      {
        number: '01',
        title: '研究目标',
        summary: researchSection.innovationPlan.objective,
        items: researchSection.innovationPlan.highlights,
      },
      ...researchSection.innovationPlan.tracks.map(([label, description], index) => ({
        number: String(index + 2).padStart(2, '0'),
        title: label.replace(/^\d+\s*\/\s*/, ''),
        summary: description,
        items: [
          index === 0 ? '统一维护场景、机体、传感器和环境参数，保证实验条件可复现。' :
          index === 1 ? '在不同通信和拓扑条件下比较多种集群控制范式。' :
          index === 2 ? '围绕重新分组、路径重规划和任务再分配设计动态场景。' :
          '记录任务完成率、决策耗时、轨迹、安全事件与通信状态。',
        ],
      })),
    ],
    sourceNote: '在研计划；内容依据最新版大学生创新训练计划书整理。',
  },
];

const buildSearchEntries = () => {
  const entries = [];
  const addEntry = ({ id, href, section, heading, text }) => {
    const values = Array.isArray(text) ? text : [text];
    const searchableText = values.filter(Boolean).join(' ');
    if (!searchableText) return;
    entries.push({
      id,
      href,
      section,
      heading,
      snippet: values.find((value) => value && value.length > 12) || searchableText,
      searchableText: searchableText.toLocaleLowerCase(),
    });
  };

  sections.filter((section) => !['research', 'poetry'].includes(section.id)).forEach((section) => {
    addEntry({
      id: `${section.id}-overview`,
      href: `#/${section.id}/${section.id}-overview`,
      section: section.nav,
      heading: '内容概览',
      text: [section.subtitle],
    });
    addEntry({
      id: `${section.id}-metrics`,
      href: `#/${section.id}/${section.id}-metrics`,
      section: section.nav,
      heading: '关键指标',
      text: section.metrics.flat(),
    });
    section.groups.forEach((group) => addEntry({
      id: `${section.id}-${group.number}`,
      href: `#/${section.id}/${section.id}-${group.number}`,
      section: section.nav,
      heading: group.title,
      text: [group.summary, ...group.items],
    }));
    if (section.featured) {
      addEntry({
        id: `${section.id}-featured`,
        href: `#/${section.id}/${section.id}-featured`,
        section: section.nav,
        heading: '代表成果信息',
        text: [section.featured.meta, section.featured.linkLabel],
      });
    }
    if (section.media) {
      addEntry({
        id: `${section.id}-media`,
        href: `#/${section.id}/${section.id}-media`,
        section: section.nav,
        heading: '图表与实物说明',
        text: section.media.flatMap((item) => [item.alt, item.caption]),
      });
    }
    if (section.id === 'profile') {
      addEntry({
        id: 'profile-editorial',
        href: '#/profile/profile-editorial',
        section: section.nav,
        heading: '个人方向概览',
        text: [
          '目前的能力版图由三条线共同构成：通信与信号处理提供理论坐标，人工智能拓展决策方法，嵌入式实践负责把方案落到真实系统。',
          '在熟悉的校园里，把通信、智能与工程实践连成一条长期路径。',
          '保留技术之外的观察、行走与审美。',
        ],
      });
    }
    addEntry({
      id: `${section.id}-source`,
      href: `#/${section.id}/${section.id}-source`,
      section: section.nav,
      heading: '资料说明',
      text: section.sourceNote,
    });
  });

  researchTopics.forEach((topic) => {
    addEntry({
      id: `${topic.id}-overview`,
      href: `#/research/${topic.id}/${topic.id}-overview`,
      section: '科研论文',
      heading: topic.shortTitle,
      text: [topic.subtitle, topic.status],
    });
    addEntry({
      id: `${topic.id}-metrics`,
      href: `#/research/${topic.id}/${topic.id}-metrics`,
      section: '科研论文',
      heading: `${topic.shortTitle} · 关键指标`,
      text: topic.metrics.flat(),
    });
    topic.groups.forEach((group) => addEntry({
      id: `${topic.id}-${group.number}`,
      href: `#/research/${topic.id}/${topic.id}-${group.number}`,
      section: '科研论文',
      heading: `${topic.shortTitle} · ${group.title}`,
      text: [group.summary, ...group.items],
    }));
    if (topic.featured) {
      addEntry({
        id: `${topic.id}-featured`,
        href: `#/research/${topic.id}/${topic.id}-featured`,
        section: '科研论文',
        heading: `${topic.shortTitle} · 发表信息`,
        text: [topic.featured.meta, topic.featured.linkLabel],
      });
    }
    if (topic.media) {
      addEntry({
        id: `${topic.id}-media`,
        href: `#/research/${topic.id}/${topic.id}-media`,
        section: '科研论文',
        heading: `${topic.shortTitle} · 图表说明`,
        text: topic.media.flatMap((item) => [item.alt, item.caption]),
      });
    }
    addEntry({
      id: `${topic.id}-source`,
      href: `#/research/${topic.id}/${topic.id}-source`,
      section: '科研论文',
      heading: `${topic.shortTitle} · 资料说明`,
      text: topic.sourceNote,
    });
  });

  poems.forEach((poem) => {
    addEntry({
      id: `poem-${poem.id}`,
      href: `#/poetry/${poem.id}/poem-text`,
      section: '个人诗集',
      heading: poem.title,
      text: poem.stanzas,
    });
  });

  return entries;
};

const searchEntries = buildSearchEntries();

const sidebarItems = ['首页', ...sections.map((section) => section.nav)];

const getRouteState = () => {
  const [value, detailValue, pageFocus] = window.location.hash.replace(/^#\/?/, '').split('/');
  const route = sections.some((section) => section.id === value) ? value : 'home';
  const topic = route === 'research' && researchTopics.some((item) => item.id === detailValue) ? detailValue : null;
  const poemId = route === 'poetry' && poems.some((item) => item.id === detailValue) ? detailValue : null;
  const focus = route === 'research' || poemId ? pageFocus : detailValue;
  return { route, topic, poemId, focus };
};

function App() {
  const [routeState, setRouteState] = useState(getRouteState);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { route, topic, poemId, focus } = routeState;

  useEffect(() => {
    const handleRoute = () => {
      setRouteState(getRouteState());
      setMobileNavOpen(false);
    };
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (focus) {
        document.getElementById(focus)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [route, topic, poemId, focus]);

  const sectionIndex = sections.findIndex((section) => section.id === route);
  const sidebarIndex = route === 'home' ? 0 : sectionIndex + 1;
  const galleryItems = useMemo(
    () => sections.map((section) => ({ image: resolveAsset(section.image), label: section.label, link: `#/${section.id}` })),
    []
  );

  const navigateTo = (index) => {
    window.location.hash = index === 0 ? '/home' : `/${sections[index - 1].id}`;
    if (index === sidebarIndex) setMobileNavOpen(false);
  };

  return (
    <div className="click-spark-root">
      <ClickSpark
        sparkColor="#ffffff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
      <div className="site-shell">
      <div className="aurora-layer" aria-hidden="true">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.0}
          color1="#f7f7f7"
          color2="#e100ff"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>

      <button
        className="mobile-nav-toggle"
        type="button"
        aria-label={mobileNavOpen ? '关闭导航' : '打开导航'}
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen((value) => !value)}
      >
        {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <SiteSearch routeKey={`${route}/${topic || ''}/${poemId || ''}`} />

      <aside className={`site-sidebar${mobileNavOpen ? ' site-sidebar--open' : ''}`}>
        <a className="brand-mark" href="#/home" aria-label="晚荇的首页">
          <Radio size={21} strokeWidth={1.6} />
          <span className="brand-mark__text">
            <strong>晚荇</strong>
            <small>个人技术博客</small>
          </span>
        </a>
        <LineSidebar
          key={route}
          items={sidebarItems}
          accentColor="#f472b6"
          textColor="#c4c4c4"
          markerColor="#60606b"
          showIndex
          showMarker
          proximityRadius={100}
          maxShift={30}
          falloff="smooth"
          markerLength={48}
          markerGap={0}
          tickScale={0.5}
          scaleTick
          itemGap={20}
          fontSize={1.02}
          smoothing={100}
          defaultActive={sidebarIndex}
          onItemClick={navigateTo}
        />
        <p className="sidebar-meta">BUAA · 2024<br />通信工程</p>
      </aside>

      {mobileNavOpen && <button className="nav-scrim" aria-label="关闭导航" onClick={() => setMobileNavOpen(false)} />}

      <main className="site-main">
        <div className={route === 'home' ? '' : 'route-hidden'} aria-hidden={route !== 'home'}>
          <HomePage galleryItems={galleryItems} />
        </div>
        {route === 'research' && !topic && <ResearchIndexPage section={researchSection} topics={researchTopics} />}
        {route === 'research' && topic && (
          <DetailPage
            section={researchTopics.find((item) => item.id === topic)}
            backHref="#/research"
            backLabel="返回科研主题目录"
            footerHref="#/research"
            footerLabel="返回科研主题目录"
          />
        )}
        {route === 'poetry' && !poemId && <PoetryIndexPage section={sections[sectionIndex]} />}
        {route === 'poetry' && poemId && <PoemPage poem={poems.find((item) => item.id === poemId)} />}
        {route !== 'home' && !['research', 'poetry'].includes(route) && <DetailPage section={sections[sectionIndex]} />}
      </main>
      </div>
      </ClickSpark>
    </div>
  );
}

function SiteSearch({ routeKey }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  const results = useMemo(() => {
    if (!terms.length) return [];
    return searchEntries
      .filter((entry) => terms.every((term) => entry.searchableText.includes(term)))
      .slice(0, 8);
  }, [normalizedQuery]);

  useEffect(() => {
    setQuery('');
  }, [routeKey]);

  const openFirstResult = (event) => {
    event.preventDefault();
    if (!results.length) return;
    window.location.hash = results[0].href.replace(/^#/, '');
    setQuery('');
  };

  return (
    <div className="site-search">
      <form className="site-search__form" role="search" onSubmit={openFirstResult}>
        <Search size={17} aria-hidden="true" />
        <label className="visually-hidden" htmlFor="site-search-input">搜索站内正文</label>
        <input
          id="site-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setQuery('');
          }}
          placeholder="搜索正文、指标与项目细节"
          autoComplete="off"
          aria-controls="site-search-results"
          aria-expanded={Boolean(normalizedQuery)}
        />
        <StarBorder
          as="button"
          type="submit"
          className="site-search__submit"
          color="#38bdf8"
          speed="5s"
          thickness={1}
          disabled={!results.length}
        >
          搜索
        </StarBorder>
      </form>
      {normalizedQuery && (
        <div className="site-search__results" id="site-search-results" role="listbox">
          {results.length ? results.map((result) => (
            <a href={result.href} role="option" key={result.id} onClick={() => setQuery('')}>
              <span>{result.section}</span>
              <strong>{result.heading}</strong>
              <p>{result.snippet}</p>
            </a>
          )) : (
            <p className="site-search__empty">没有找到匹配的正文内容</p>
          )}
        </div>
      )}
    </div>
  );
}

function ResearchIndexPage({ section, topics }) {
  return (
    <div className="detail-page research-index-page">
      <header className="detail-header">
        <a className="back-link" href="#/home"><ArrowLeft size={17} /> 返回首页目录</a>
        <p>{section.eyebrow}</p>
        <h1>{section.title}</h1>
        <p className="detail-subtitle">以主题组织科研工作。AA-MAPPO 为核心论文，其余课题按独立研究线索分别展开。</p>
      </header>

      <section className="detail-content" aria-label="科研主题目录">
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="rgba(18, 15, 23, 0.6)"
          borderRadius={28}
          glowRadius={40}
          glowIntensity={1.0}
          coneSpread={25}
          animated={false}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
          <article className="content-panel research-index">
            <div className="content-lead">
              <p className="content-kicker">RESEARCH INDEX / {String(topics.length).padStart(2, '0')} TOPICS</p>
              <h2>科研主题目录</h2>
              <p>先选择研究主题，再进入完整的问题定义、方法、实验与阶段结论。</p>
            </div>
            <div className="research-topic-list">
              {topics.map((item) => (
                <a className="research-topic-link" href={`#/research/${item.id}`} key={item.id}>
                  <div className="research-topic-link__meta">
                    <span>{item.index}</span>
                    <p>{item.category}</p>
                  </div>
                  <div className="research-topic-link__body">
                    <p>{item.status}</p>
                    <h3>{item.shortTitle}</h3>
                    <span>{item.subtitle}</span>
                    <div className="research-topic-link__keywords">
                      {item.keywords.map((keyword) => <em key={keyword}>{keyword}</em>)}
                    </div>
                  </div>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </a>
              ))}
            </div>
            <footer className="content-footer">
              <span>研究主题将随资料补充继续扩展，核心论文始终置于首位。</span>
              <a href="#/home">返回四卷目录 <ArrowUpRight size={16} /></a>
            </footer>
          </article>
        </BorderGlow>
      </section>
    </div>
  );
}

function PoetryIndexPage({ section }) {
  return (
    <div className="detail-page poetry-index-page">
      <header className="detail-header">
        <a className="back-link" href="#/home"><ArrowLeft size={17} /> 返回首页目录</a>
        <p>{section.eyebrow}</p>
        <h1>{section.title}</h1>
        <p className="detail-subtitle">草木、月色、远方与人间。</p>
      </header>

      <section className="detail-content" aria-label="个人诗集目录">
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="rgba(18, 15, 23, 0.6)"
          borderRadius={28}
          glowRadius={40}
          glowIntensity={1.0}
          coneSpread={12}
          animated={false}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
          <article className="content-panel poetry-index">
            <div className="content-lead" id="poetry-overview">
              <p className="content-kicker">POETRY INDEX / {poems.length} WORKS</p>
              <h2>诗集目录</h2>
              <p>点击题目进入单篇阅读；阅读页可继续前往上一篇或下一篇。</p>
            </div>

            <ol className="poetry-directory">
              {poems.map((poem) => (
                <li key={poem.id}>
                  <a href={`#/poetry/${poem.id}`}>
                    <span>{poem.id}</span>
                    <strong>{poem.title}</strong>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>

            <footer className="content-footer">
              <span>正文按整理稿原文录入，保留原有标点与分行。</span>
              <a href="#/home">返回四卷目录 <ArrowUpRight size={16} /></a>
            </footer>
          </article>
        </BorderGlow>
      </section>
    </div>
  );
}

function PoemPage({ poem }) {
  const poemIndex = poems.findIndex((item) => item.id === poem.id);
  const previousPoem = poems[poemIndex - 1];
  const nextPoem = poems[poemIndex + 1];

  return (
    <div className="detail-page poem-page">
      <header className="detail-header poem-header">
        <a className="back-link" href="#/poetry"><ArrowLeft size={17} /> 返回个人诗集目录</a>
        <p>POETRY / 晚荇 / {poem.id} OF {poems.length}</p>
        <h1>{poem.title}</h1>
      </header>

      <section className="detail-content poem-content" aria-label={`《${poem.title}》正文`}>
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="rgba(18, 15, 23, 0.6)"
          borderRadius={28}
          glowRadius={40}
          glowIntensity={1.0}
          coneSpread={12}
          animated={false}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
          <article className="poem-reader">
            <header className="poem-reader__heading">
              <span>{poem.id}</span>
              <p>晚荇 · 个人诗集</p>
            </header>

            <div className="poem-text" id="poem-text">
              {poem.stanzas.map((stanza, index) => <p key={`${poem.id}-${index}`}>{stanza}</p>)}
            </div>

            <nav className="poem-pagination" aria-label="诗歌篇目导航">
              {previousPoem ? (
                <a href={`#/poetry/${previousPoem.id}`} className="poem-pagination__previous">
                  <ArrowLeft size={18} />
                  <span><small>上一篇 · {previousPoem.id}</small><strong>{previousPoem.title}</strong></span>
                </a>
              ) : <span />}
              {nextPoem ? (
                <a href={`#/poetry/${nextPoem.id}`} className="poem-pagination__next">
                  <span><small>下一篇 · {nextPoem.id}</small><strong>{nextPoem.title}</strong></span>
                  <ArrowRight size={18} />
                </a>
              ) : <a href="#/poetry" className="poem-pagination__next"><span><small>阅读完成</small><strong>返回诗集目录</strong></span><ArrowUpRight size={18} /></a>}
            </nav>
          </article>
        </BorderGlow>
      </section>
    </div>
  );
}

function HomePage({ galleryItems }) {
  return (
    <div className="home-page">
      <header className="hero" aria-labelledby="hero-author">
        <div className="hero-particles" aria-hidden="true">
          <Particles
            particleColors={['#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <div className="hero-content">
          <div className="hero-meta">
            <span>BEIJING · CHINA</span>
            <span>COMMUNICATION ENGINEERING</span>
          </div>
          <div className="particle-title" style={{ width: '100%', height: 360 }}>
            <ParticleText
              text="路漫漫其修远兮"
              particleSize={1.8}
              density={2}
              color="#ffffff"
              highlightColor="#8b5cf6"
              scatter={180}
              gatherDuration={1600}
              stagger={420}
              pointerRepel={40}
              repelRadius={120}
              idleDrift={0}
              trigger="mount"
              fontSize="clamp(3rem, 10vw, 7.5rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow
            />
          </div>
          <div className="particle-author" id="hero-author">
            <ParticleText
              text="——晚荇"
              particleSize={1.5}
              density={2}
              color="#dad7df"
              highlightColor="#38bdf8"
              scatter={80}
              gatherDuration={1200}
              stagger={260}
              pointerRepel={22}
              repelRadius={80}
              idleDrift={0}
              trigger="mount"
              fontSize="clamp(1.4rem, 3vw, 2.4rem)"
              fontWeight={500}
              fontFamily="inherit"
              glow
            />
          </div>
          <p className="hero-intro">吾将上下而求索</p>
        </div>
      </header>

      <section className="home-gallery" aria-labelledby="explore-title">
        <div className="section-heading">
          <p>SELECTED PATHS / 01—04</p>
          <h2 id="explore-title">循迹而入</h2>
        </div>
        <AccordionGallery items={galleryItems} defaultIndex={1} expandRatio={0.52} trigger="hover" height={500} radius={6} gap={8} accentColor="#f472b6" />
      </section>
    </div>
  );
}

function DetailPage({
  section,
  backHref = '#/home',
  backLabel = '返回首页目录',
  footerHref = '#/home',
  footerLabel = '返回四卷目录',
}) {
  return (
    <div className="detail-page">
      <header className="detail-header">
        <a className="back-link" href={backHref}><ArrowLeft size={17} /> {backLabel}</a>
        <p>{section.eyebrow || section.category}</p>
        <h1>{section.title}</h1>
        <p className="detail-subtitle">{section.subtitle}</p>
      </header>

      <section className="detail-content" aria-label={`${section.nav || '科研论文'}内容`}>
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="rgba(18, 15, 23, 0.6)"
          borderRadius={28}
          glowRadius={40}
          glowIntensity={1.0}
          coneSpread={25}
          animated={false}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
          <article className="content-panel">
            <div className="content-lead" id={`${section.id}-overview`}>
              <p className="content-kicker">{section.nav || '科研论文'} / CONTENT OVERVIEW</p>
              <h2>{section.subtitle}</h2>
            </div>

            <dl className="metric-strip" id={`${section.id}-metrics`}>
              {section.metrics.map(([value, label]) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>

            {section.id === 'profile' && (
              <section className="profile-editorial" id="profile-editorial" aria-label="个人方向概览">
                <div className="profile-editorial__lead">
                  <figure className="profile-editorial__main">
                    <img src={resolveAsset('/assets/profile/beihang-night.jpg')} alt="校园夜景" loading="lazy" />
                    <figcaption>在熟悉的校园里，把通信、智能与工程实践连成一条长期路径。</figcaption>
                  </figure>
                  <div className="profile-editorial__copy">
                  <p>PERSONAL SIGNAL / 2024</p>
                  <h3>以通信为经，以实践为纬</h3>
                  <p>目前的能力版图由三条线共同构成：通信与信号处理提供理论坐标，人工智能拓展决策方法，嵌入式实践负责把方案落到真实系统。</p>
                  <div className="profile-tags" aria-label="技术方向">
                    <span>6G / ISAC</span>
                    <span>Multi-Agent RL</span>
                    <span>Embedded Systems</span>
                    <span>Wireless Sensing</span>
                  </div>
                  </div>
                </div>
                <div className="profile-editorial__gallery">
                  <figure className="profile-editorial__wide">
                    <img src={resolveAsset('/assets/profile/garden.jpg')} alt="园林景观中的个人生活记录" loading="lazy" />
                    <figcaption><span>生活切片</span>保留技术之外的观察、行走与审美。</figcaption>
                  </figure>
                  <figure className="profile-editorial__portrait">
                    <img src={resolveAsset('/assets/profile/portrait-mono.jpg')} alt="黑白个人肖像" loading="lazy" />
                    <figcaption><span>晚荇</span>通信工程 · 2024级</figcaption>
                  </figure>
                </div>
              </section>
            )}

            {section.featured && (
              <div className="featured-work" id={`${section.id}-featured`}>
                <p>{section.featured.label}</p>
                <div>
                  <h3>{section.featured.title}</h3>
                  <span>{section.featured.meta}</span>
                </div>
                {section.featured.href && (
                  <a href={section.featured.href} target="_blank" rel="noreferrer">
                    {section.featured.linkLabel}<ExternalLink size={16} />
                  </a>
                )}
              </div>
            )}

            {section.media && (
              <section className="media-story" id={`${section.id}-media`} aria-label={`${section.nav}图集`}>
                <div className="media-story__heading">
                  <p>VISUAL EVIDENCE</p>
                  <h3>从模型到现场</h3>
                </div>
                <div className="media-story__grid">
                  {section.media.map((item) => (
                    <figure className={item.photo ? 'media-story__item media-story__item--photo' : 'media-story__item'} key={item.src}>
                      <div className="media-story__image">
                        <img src={resolveAsset(item.src)} alt={item.alt} loading="lazy" />
                      </div>
                      <figcaption>
                        <strong>{item.title}</strong>
                        <span>{item.caption}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            <div className="content-sections">
              {section.groups.map((group) => (
                <section className="content-section" id={`${section.id}-${group.number}`} key={group.number}>
                  <div className="content-section__heading">
                    <span>{group.number}</span>
                    <div>
                      <h3>{group.title}</h3>
                      <p>{group.summary}</p>
                    </div>
                  </div>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              ))}
            </div>

            {section.researchArchive && (
              <section className="research-archive" aria-labelledby="research-archive-title">
                <div className="archive-heading">
                  <p>RESEARCH ARCHIVE / BEYOND THE FEATURED PAPER</p>
                  <h3 id="research-archive-title">其他研究与工程课题</h3>
                  <span>以下项目独立于 AA-MAPPO 论文呈现，记录不同方向上的方法积累与工程验证。</span>
                </div>
                <div className="archive-list">
                  {section.researchArchive.map((project) => (
                    <article className="archive-project" key={project.index}>
                      <header>
                        <span>{project.index}</span>
                        <div>
                          <h4>{project.title}</h4>
                          <p>{project.meta}</p>
                        </div>
                      </header>
                      <p className="archive-project__description">{project.description}</p>
                      <ul>
                        {project.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                      {project.media && (
                        <div className="archive-project__media">
                          {project.media.map((image) => (
                            <img src={resolveAsset(image.src)} alt={image.alt} loading="lazy" key={image.src} />
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {section.innovationPlan && (
              <section className="innovation-plan" aria-labelledby="innovation-plan-title">
                <div className="innovation-plan__heading">
                  <p>ONGOING INNOVATION PLAN</p>
                  <span>{section.innovationPlan.meta}</span>
                  <h3 id="innovation-plan-title">{section.innovationPlan.title}</h3>
                  <p>{section.innovationPlan.summary}</p>
                </div>
                <div className="innovation-plan__objective">
                  <span>研究目标</span>
                  <p>{section.innovationPlan.objective}</p>
                </div>
                <div className="innovation-plan__tracks">
                  {section.innovationPlan.tracks.map(([label, description]) => (
                    <article key={label}>
                      <h4>{label}</h4>
                      <p>{description}</p>
                    </article>
                  ))}
                </div>
                <div className="innovation-plan__highlights">
                  <span>创新特色</span>
                  <ul>
                    {section.innovationPlan.highlights.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </section>
            )}

            <footer className="content-footer" id={`${section.id}-source`}>
              <span>{section.sourceNote}</span>
              <a href={footerHref}>{footerLabel} <ArrowUpRight size={16} /></a>
            </footer>
          </article>
        </BorderGlow>
      </section>
    </div>
  );
}

export default App;
