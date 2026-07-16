# HiSH Linux 虚拟机 - Operit AI 插件

> 在 Operit AI 里跑 Linux，不需要系统终端

---

## 📥 下载这 3 个文件到手机

### 1. QEMU 二进制（3.6MB）
https://packages.termux.dev/apt/termux-main/pool/main/q/qemu-system-aarch64-headless/qemu-system-aarch64-headless_1%3A10.2.1_aarch64.deb

> 用 7-Zip 解压，取出 `usr/bin/qemu-system-aarch64`

### 2. Linux 内核（5MB）
https://dl-cdn.alpinelinux.org/alpine/v3.20/releases/aarch64/netboot/vmlinuz-lts

> 下载后改名叫 `Image`

### 3. Alpine Linux 系统（50MB）✅ 直接用！
https://dl-cdn.alpinelinux.org/alpine/v3.20/releases/aarch64/alpine-virt-3.20.3-aarch64.iso

> **不需要安装**，启动就能用（类似U盘启动）

---

## 🚀 使用步骤

### 第 1 步：把文件放到手机

放到手机 `/sdcard/Download/` 目录：

```
手机/sdcard/Download/
├── index.js                    ← 从本仓库下载
├── qemu-system-aarch64         ← 从 deb 解压出来
├── Image                       ← vmlinuz-lts 改名
└── alpine-virt-3.20.3-aarch64.iso  ← 直接放
```

### 第 2 步：导入插件

1. 打开 **Operit AI**
2. 我的 → 插件管理 → 导入插件
3. 选择 `index.js`
4. 启用

### 第 3 步：对着 Operit AI 说话

复制下面的话发给它：

```
创建一个名叫 mylinux 的模拟器，根文件系统路径 /sdcard/Download/alpine-virt-3.20.3-aarch64.iso，内核路径 /sdcard/Download/Image，镜像类型 iso
```

等它说创建成功，再说：

```
启动模拟器
```

启动后你可以说：

```
在模拟器里执行 uname -a
在模拟器里执行 ls /
```

想关就说：

```
停止模拟器
```

---

## 💡 常用操作

| 你想做什么 | 怎么说 |
|-----------|--------|
| 创建虚拟机（ISO模式） | `创建一个名叫 mylinux 的模拟器，根文件系统路径 /sdcard/Download/alpine-virt-3.20.3-aarch64.iso，内核路径 /sdcard/Download/Image，镜像类型 iso` |
| 启动 | `启动模拟器 mylinux` |
| 执行命令 | `在模拟器里执行 uname -a` |
| 装软件 | `在模拟器里安装 python3` |
| 开 VNC | `为模拟器配置 VNC，启用，端口模式 lan` |
| 端口转发 | `为模拟器配置端口转发：主机 8022 转发到客户机 22` |
| 关虚拟机 | `停止模拟器 mylinux` |

---

## 📁 目录结构

```
.
├── index.js          ← 直接导入这个（成品）
├── src/
│   ├── index.js      ← 和根目录一样（备份）
│   └── index.ts      ← 源码（开发者看）
└── README.md         ← 你正在看的
```

---

## ⚠️ 注意

- 手机 CPU 必须是 ARM64（现在的手机基本都是）
- ISO 模式下关机后数据不会保存（U盘启动原理）
- 想保存数据？下次我教你安装到硬盘（qcow2）