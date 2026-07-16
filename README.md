# HiSH Linux 虚拟机 - Operit AI 插件

> 在 Operit AI 里跑 Linux，不需要系统终端

---

## 📥 下载文件

打开本仓库的 **`手机直接用`** 文件夹，下载里面所有文件到手机 `/sdcard/Download/`：

| 文件 | 说明 |
|------|------|
| `index.js` | 插件文件，导入 Operit AI 用 |
| `qemu-system-aarch64` | QEMU 主程序（已解压好，直接用） |
| `Image` | Linux 内核（已改名好，直接用） |
| `alpine-virt-3.20.3-aarch64.iso` | Alpine Linux 系统（直接用） |
| `qemu/` 文件夹 | QEMU 固件文件（整个文件夹放进去） |

> 全部已解压处理好，不需要再做任何解压操作。

---

## 🚀 三步搞定

### 第 1 步：放文件到手机

把 `手机直接用` 文件夹里的所有文件，复制到手机 `/sdcard/Download/`：

```
手机/sdcard/Download/
├── index.js
├── qemu-system-aarch64
├── Image
├── alpine-virt-3.20.3-aarch64.iso
└── qemu/                  ← 整个文件夹
```

### 第 2 步：导入插件

1. 打开 **Operit AI**
2. 我的 → 插件管理 → 导入插件
3. 选择 `/sdcard/Download/index.js`
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
| 创建虚拟机 | `创建一个名叫 mylinux 的模拟器，根文件系统路径 /sdcard/Download/alpine-virt-3.20.3-aarch64.iso，内核路径 /sdcard/Download/Image，镜像类型 iso` |
| 启动 | `启动模拟器 mylinux` |
| 执行命令 | `在模拟器里执行 uname -a` |
| 装软件 | `在模拟器里安装 python3` |
| 开 VNC | `为模拟器配置 VNC，启用，端口模式 lan` |
| 端口转发 | `为模拟器配置端口转发：主机 8022 转发到客户机 22` |
| 关虚拟机 | `停止模拟器 mylinux` |

---

## 📁 仓库结构

```
.
├── 手机直接用/              ← 下载这个文件夹里的所有文件
│   ├── index.js            ← 插件文件
│   ├── qemu-system-aarch64 ← QEMU 主程序
│   ├── Image               ← Linux 内核
│   ├── alpine-virt-3.20.3-aarch64.iso  ← Linux 系统
│   └── qemu/               ← QEMU 固件文件夹
├── index.js                ← 插件文件（根目录也有一份）
└── README.md               ← 你正在看的
```

---

## ⚠️ 注意

- 手机 CPU 必须是 ARM64（现在的手机基本都是）
- ISO 模式下关机后数据不会保存（类似 U 盘启动原理）
- Operit AI 目前支持 Android 8+，鸿蒙6等官方更新