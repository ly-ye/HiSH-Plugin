# HiSH Linux 虚拟机 - Operit AI 插件

> 在 Operit AI 里跑 Linux，不需要系统终端

---

## 📥 下载这 4 个文件

### 1. QEMU 二进制（3.6MB）

https://packages.termux.dev/apt/termux-main/pool/main/q/qemu-system-aarch64-headless/qemu-system-aarch64-headless_1%3A10.2.1_aarch64.deb

> 下载后解压（deb 就是 zip），取出 `usr/bin/qemu-system-aarch64`

### 2. QEMU 公共库（必需）

https://packages.termux.dev/apt/termux-main/pool/main/q/qemu-common/qemu-common_1%3A10.2.1_aarch64.deb

> 解压后把 `usr/` 里所有文件放到 `/data/data/com.termux/files/usr/`

### 3. Linux 内核（5MB）

https://dl-cdn.alpinelinux.org/alpine/v3.20/releases/aarch64/netboot/vmlinuz-lts

> 下载后改名叫 `Image`

### 4. Alpine Linux 系统（50MB）

https://dl-cdn.alpinelinux.org/alpine/v3.20/releases/aarch64/alpine-virt-3.20.3-aarch64.iso

> 这是安装镜像，第一次启动需要安装系统

---

## 🚀 使用步骤

### 第 1 步：把文件放到手机

把解压后的文件放到手机 `/sdcard/Download/` 目录：

```
手机/sdcard/Download/
├── index.js                    ← 本仓库根目录下载
├── qemu-system-aarch64         ← 从 deb 解压出来
├── Image                       ← vmlinuz-lts 改名
└── alpine-virt-3.20.3-aarch64.iso
```

### 第 2 步：导入插件

1. 打开 **Operit AI**
2. 我的 → 插件管理 → 导入插件
3. 选择 `index.js`
4. 启用

### 第 3 步：创建虚拟机

对 Operit AI 说：

```
创建一个名叫 mylinux 的模拟器，根文件系统路径 /sdcard/Download/alpine-virt-3.20.3-aarch64.iso，内核路径 /sdcard/Download/Image
```

```
启动模拟器
```

启动后会进入 Alpine 安装界面，按提示安装系统。

---

## 💡 常用操作

| 你想做什么 | 怎么说 |
|-----------|--------|
| 看系统信息 | `获取模拟器的系统信息` |
| 看进程 | `获取模拟器的进程列表` |
| 装软件 | `在模拟器里安装 python3` |
| 开 VNC | `为模拟器配置 VNC，启用，端口模式 lan` |
| 端口转发 | `为模拟器配置端口转发：主机 8022 转发到客户机 22` |
| 关虚拟机 | `停止模拟器` |

---

## 📁 目录结构

```
.
├── index.js          ← 直接导入这个（成品）
├── src/
│   ├── index.js      ← 和根目录一样（备份）
│   └── index.ts      ← TypeScript 源码（开发者看）
└── README.md         ← 你正在看的
```

---

## ⚠️ 注意

- 手机 CPU 必须是 ARM64（现在的手机基本都是）
- Operit AI 目前只支持 Android 8+，鸿蒙6等官方更新
- QEMU 二进制必须是 ARM64 版本的
- deb 包可以用 7-Zip 或其他解压软件打开