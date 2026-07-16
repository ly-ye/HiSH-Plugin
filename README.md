# HiSH Operit AI 插件 - 一键打包版

> 零基础也能用的 Linux 虚拟机插件

---

## 📦 包里有什么

```
HiSH-Operit-Plugin-Package/
├── src/
│   └── index.js          ← 插件文件（直接导入 Operit AI）
├── assets/
│   └── (空，需要下载以下文件放这里)
│       ├── qemu-system-aarch64   ← QEMU 虚拟机引擎
│       ├── Image                  ← Linux 内核
│       └── rootfs.qcow2          ← Alpine Linux 系统
└── README.md             ← 这个文件
```

---

## 🚀 使用步骤（小学生也能看懂）

### 第一步：下载三个必须的文件

打开手机浏览器，下载以下文件：

| 文件 | 下载地址 | 说明 |
|------|---------|------|
| `qemu-system-aarch64` | https://github.com/harmoninux/HiSH/releases | QEMU 虚拟机引擎 |
| `Image` | https://github.com/harmoninux/HiSH/releases | Linux 内核 |
| `rootfs.qcow2` | https://github.com/harmoninux/HiSH/releases | Alpine Linux 系统 |

> 如果上面链接打不开，在百度搜 **"HiSH qemu-ohos"**，找到 releases 页面

### 第二步：把文件放到手机

把下载的四个文件（包括 `index.js`）放到手机的 `Download` 文件夹：

```
手机/Download/
├── index.js
├── qemu-system-aarch64
├── Image
└── rootfs.qcow2
```

### 第三步：导入 Operit AI

1. 打开 **Operit AI**
2. 点右下角 **我的** → **插件管理** → **导入插件**
3. 选择 `index.js`
4. 看到 **"HiSH Linux 虚拟机管理器"** 点启用

### 第四步：对着 Operit AI 说话

复制下面的话发给 Operit AI：

```
创建一个名叫 mylinux 的模拟器，根文件系统路径 /sdcard/Download/rootfs.qcow2，内核路径 /sdcard/Download/Image
```

等它回复创建成功后，再说：

```
启动模拟器
```

启动成功后，你可以说任何命令：

```
在模拟器里执行 uname -a
在模拟器里执行 ls /
在模拟器里安装 python3
```

想关就说：

```
停止模拟器
```

---

## 💡 进阶功能（懂的人看）

### VNC 远程桌面

先停止模拟器，然后说：

```
为模拟器配置 VNC，启用，端口模式 lan，端口 5900
```

启动后用 VNC 客户端连接：`手机IP:5900`

### 端口转发

```
为模拟器配置端口转发：主机 8022 转发到客户机 22
```

然后用 SSH 连接：`ssh root@手机IP -p 8022`

### 共享文件夹

在虚拟机里执行：

```
mkdir -p /mnt/host
mount -t 9p -o trans=virtio hostshare /mnt/host
```

---

## ❌ 常见问题

**问题：启动失败，提示进程已退出**
→ 检查 `qemu-system-aarch64` 文件是否在手机上，路径是否正确

**问题：执行命令失败，串口连接失败**
→ 等虚拟机完全启动再试（启动后等 30 秒）

**问题：Operit AI 安装不了**
→ 当前版本只支持 Android 8+，鸿蒙6需要等 Operit AI 更新

---

## 📄 许可证

基于 HiSH 开源项目，遵循 MIT 许可证
