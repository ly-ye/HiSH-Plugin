# HiSH Linux 虚拟机 - Operit AI 插件

> 在 Operit AI 里跑 Linux，不需要系统终端

---

## ⚠️ 重要说明

**QEMU 二进制、Linux 内核、rootfs 需要你自己准备。**

这些文件不在这个仓库里，原因：
- QEMU 二进制约 30MB，内核约 20MB，rootfs 约 500MB
- GitHub 有单文件 100MB 限制，放不进来

---

## 📦 你需要的 3 个文件

| 文件 | 大小 | 从哪里获取 |
|------|------|-----------|
| `qemu-system-aarch64` | ~30MB | 见下方 |
| `Image`（内核） | ~20MB | 见下方 |
| `rootfs.qcow2` | ~500MB | 见下方 |

### 方案 1：从 HiSH 应用提取（推荐）

1. 安装 **HiSH** 鸿蒙应用（从 [HiSH Releases](https://github.com/harmoninux/HiSH/releases) 下载）
2. 安装后，文件会解压到应用目录里
3. 用文件管理器找到这些文件

### 方案 2：自己编译/准备

#### QEMU 二进制

```bash
# 在 Linux 上编译 ARM64 静态版本
git clone https://github.com/nicholasgasior/qemu
cd qemu
./configure --target-list=aarch64-softmmu --static --disable-system
make -j$(nproc)
# 产物: build/qemu-system-aarch64
```

或下载预编译版：https://www.qemu.org/download/

#### Linux 内核

从 Alpine Linux 官网下载 ARM64 内核：
https://alpinelinux.org/downloads/

#### rootfs

```bash
# 创建空磁盘
qemu-img create -f qcow2 rootfs.qcow2 2G

# 然后用安装镜像引导安装 Alpine
```

---

## 🚀 使用步骤

### 第 1 步：把文件放到手机

把以下文件放到手机 `Download` 文件夹：

```
手机/Download/
├── index.js          ← 本仓库根目录
├── qemu-system-aarch64
├── Image
└── rootfs.qcow2
```

### 第 2 步：导入插件

1. 打开 **Operit AI**
2. 我的 → 插件管理 → 导入插件
3. 选择 `index.js`
4. 启用

### 第 3 步：开始用

对 Operit AI 说：

```
创建一个名叫 mylinux 的模拟器，根文件系统路径 /sdcard/Download/rootfs.qcow2，内核路径 /sdcard/Download/Image
```

```
启动模拟器
```

```
在模拟器里执行 uname -a
```

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