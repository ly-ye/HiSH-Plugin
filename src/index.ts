/* METADATA
{
  "name": "hish_linux_vm",
  "display_name": {
    "zh": "HiSH Linux 虚拟机管理器",
    "en": "HiSH Linux VM Manager",
    "default": "HiSH Linux VM Manager"
  },
  "description": {
    "zh": "基于 HiSH 开源项目架构的 Linux 虚拟机管理插件。支持 QEMU 虚拟化、端口转发、文件共享、VNC 远程桌面、系统监控等功能。适配 Operit AI 平台终端环境。",
    "en": "Linux VM management plugin based on HiSH open source project architecture. Supports QEMU virtualization, port forwarding, file sharing, VNC remote desktop, system monitoring. Adapted for Operit AI platform terminal environment.",
    "default": "HiSH Linux VM Manager for Operit AI"
  },
  "author": ["HiSH Team"],
  "category": "System",
  "env": ["HISH_VM_DATA_DIR"],
  "tools": [
    {
      "name": "create_emulator",
      "description": {
        "zh": "创建新的 QEMU 模拟器配置",
        "en": "Create a new QEMU emulator configuration",
        "default": "Create emulator config"
      },
      "parameters": [
        { "name": "name", "description": { "zh": "模拟器名称", "en": "Emulator name", "default": "Name" }, "type": "string", "required": true },
        { "name": "cpu", "description": { "zh": "CPU 核心数（默认 1）", "en": "CPU cores (default 1)", "default": "CPU cores" }, "type": "number", "required": false },
        { "name": "memory", "description": { "zh": "内存大小 MB（默认 512）", "en": "Memory MB (default 512)", "default": "Memory MB" }, "type": "number", "required": false },
        { "name": "rootfs_path", "description": { "zh": "根文件系统镜像路径", "en": "Root filesystem image path", "default": "Rootfs path" }, "type": "string", "required": true },
        { "name": "kernel_path", "description": { "zh": "内核镜像路径", "en": "Kernel image path", "default": "Kernel path" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "list_emulators",
      "description": {
        "zh": "列出所有已配置的模拟器",
        "en": "List all configured emulators",
        "default": "List emulators"
      },
      "parameters": []
    },
    {
      "name": "delete_emulator",
      "description": {
        "zh": "删除指定模拟器配置",
        "en": "Delete an emulator configuration",
        "default": "Delete emulator"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "start_vm",
      "description": {
        "zh": "启动指定模拟器的 QEMU 虚拟机",
        "en": "Start QEMU VM for specified emulator",
        "default": "Start VM"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "stop_vm",
      "description": {
        "zh": "停止运行中的虚拟机",
        "en": "Stop running VM",
        "default": "Stop VM"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "get_vm_status",
      "description": {
        "zh": "获取虚拟机运行状态",
        "en": "Get VM running status",
        "default": "Get VM status"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "configure_port_mapping",
      "description": {
        "zh": "配置端口转发规则",
        "en": "Configure port forwarding rule",
        "default": "Configure port mapping"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "host_port", "description": { "zh": "主机端口", "en": "Host port", "default": "Host port" }, "type": "number", "required": true },
        { "name": "guest_port", "description": { "zh": "客户机端口", "en": "Guest port", "default": "Guest port" }, "type": "number", "required": true }
      ]
    },
    {
      "name": "list_port_mappings",
      "description": {
        "zh": "列出端口转发规则",
        "en": "List port forwarding rules",
        "default": "List port mappings"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "remove_port_mapping",
      "description": {
        "zh": "删除端口转发规则",
        "en": "Remove port forwarding rule",
        "default": "Remove port mapping"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "host_port", "description": { "zh": "主机端口", "en": "Host port", "default": "Host port" }, "type": "number", "required": true }
      ]
    },
    {
      "name": "execute_command",
      "description": {
        "zh": "在虚拟机终端中执行命令",
        "en": "Execute command in VM terminal",
        "default": "Execute command"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "command", "description": { "zh": "要执行的命令", "en": "Command to execute", "default": "Command" }, "type": "string", "required": true },
        { "name": "timeout_ms", "description": { "zh": "超时时间（毫秒，默认 30000）", "en": "Timeout in ms (default 30000)", "default": "Timeout" }, "type": "number", "required": false }
      ]
    },
    {
      "name": "get_system_info",
      "description": {
        "zh": "获取虚拟机系统信息（CPU/内存/磁盘）",
        "en": "Get VM system info (CPU/Memory/Disk)",
        "default": "Get system info"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "get_process_list",
      "description": {
        "zh": "获取虚拟机进程列表",
        "en": "Get VM process list",
        "default": "Get processes"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "upload_file",
      "description": {
        "zh": "上传文件到虚拟机共享目录",
        "en": "Upload file to VM shared folder",
        "default": "Upload file"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "local_path", "description": { "zh": "本地文件路径", "en": "Local file path", "default": "Local path" }, "type": "string", "required": true },
        { "name": "remote_path", "description": { "zh": "虚拟机目标路径", "en": "Remote path", "default": "Remote path" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "download_file",
      "description": {
        "zh": "从虚拟机下载文件",
        "en": "Download file from VM",
        "default": "Download file"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "remote_path", "description": { "zh": "虚拟机文件路径", "en": "Remote path", "default": "Remote path" }, "type": "string", "required": true },
        { "name": "local_path", "description": { "zh": "本地目标路径", "en": "Local path", "default": "Local path" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "install_package",
      "description": {
        "zh": "在虚拟机中安装软件包",
        "en": "Install package in VM",
        "default": "Install package"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "package_name", "description": { "zh": "软件包名称", "en": "Package name", "default": "Package name" }, "type": "string", "required": true },
        { "name": "package_manager", "description": { "zh": "包管理器（apk/apt）", "en": "Package manager (apk/apt)", "default": "Package manager" }, "type": "string", "required": false }
      ]
    },
    {
      "name": "configure_vnc",
      "description": {
        "zh": "配置 VNC 远程桌面",
        "en": "Configure VNC remote desktop",
        "default": "Configure VNC"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "enabled", "description": { "zh": "是否启用 VNC", "en": "Enable VNC", "default": "Enable VNC" }, "type": "boolean", "required": true },
        { "name": "port_mode", "description": { "zh": "端口模式：local(仅本地) 或 lan(局域网)", "en": "Port mode: local or lan", "default": "Port mode" }, "type": "string", "required": false },
        { "name": "port", "description": { "zh": "VNC 端口号（默认 5900）", "en": "VNC port (default 5900)", "default": "VNC port" }, "type": "number", "required": false }
      ]
    },
    {
      "name": "get_vnc_info",
      "description": {
        "zh": "获取 VNC 连接信息",
        "en": "Get VNC connection info",
        "default": "Get VNC info"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "add_disk_drive",
      "description": {
        "zh": "添加额外磁盘驱动器",
        "en": "Add extra disk drive",
        "default": "Add disk drive"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "image_path", "description": { "zh": "磁盘镜像路径", "en": "Disk image path", "default": "Image path" }, "type": "string", "required": true },
        { "name": "format", "description": { "zh": "镜像格式（qcow2/raw，默认 qcow2）", "en": "Image format (qcow2/raw)", "default": "Format" }, "type": "string", "required": false }
      ]
    },
    {
      "name": "configure_shared_folder",
      "description": {
        "zh": "配置共享文件夹",
        "en": "Configure shared folder",
        "default": "Configure shared folder"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "host_path", "description": { "zh": "主机共享目录路径", "en": "Host shared folder path", "default": "Host path" }, "type": "string", "required": false },
        { "name": "readonly", "description": { "zh": "是否只读", "en": "Read only", "default": "Read only" }, "type": "boolean", "required": false }
      ]
    },
    {
      "name": "get_qemu_logs",
      "description": {
        "zh": "获取 QEMU 运行日志",
        "en": "Get QEMU runtime logs",
        "default": "Get QEMU logs"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "lines", "description": { "zh": "返回最后多少行（默认 100）", "en": "Last N lines (default 100)", "default": "Lines" }, "type": "number", "required": false }
      ]
    },
    {
      "name": "get_qemu_command",
      "description": {
        "zh": "获取 QEMU 启动命令行（用于调试）",
        "en": "Get QEMU launch command line (for debugging)",
        "default": "Get QEMU command"
      },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    }
  ]
}*/

/// <reference path="../types/index.d.ts" />

// ============================================================================
// Data Models - Based on HiSH entry/src/main/ets/model/Emulator.ets
// ============================================================================

interface PortMapping {
    host: number;
    guest: number;
}

interface DiskDrive {
    id: string;
    path: string;
    format: string;
}

interface Emulator {
    id: string;
    name: string;
    cpu: number;
    memory: number;
    init: string;
    portMapping: PortMapping[];
    rootVda: string;
    rootFilesystem: string;
    kernelPath: string;
    sharedFolderReadonly: boolean;
    sharedFolder: string;
    serialSocket: string;
    qmpSocket: string;
    qgaSocket: string;
    vncEnabled: boolean;
    vncPortMode: string;
    vncPort: number;
    disks: DiskDrive[];
    sessionId?: string;
    status: 'stopped' | 'running' | 'starting' | 'error';
    pid?: number;
    uptime?: number;
}

interface VMStatus {
    emulatorId: string;
    status: 'stopped' | 'running' | 'starting' | 'error';
    message: string;
    pid?: number;
    uptime?: number;
}

interface CommandResult {
    exitCode: number;
    output: string;
    timedOut?: boolean;
}

interface SystemInfo {
    cpu: { model: string; cores: number; usage: number };
    memory: { total: number; used: number; available: number };
    disk: { total: number; used: number; available: number };
    os: string;
    kernel: string;
    hostname: string;
    uptime: string;
}

interface ProcessInfo {
    pid: number;
    name: string;
    user: string;
    cpu: number;
    memory: number;
    status: string;
}

// ============================================================================
// HiSH Plugin Core - Based on HiSH Architecture
// ============================================================================

const HiSHPlugin = (function () {
    const CONFIG_DIR = NativeInterface.getPluginConfigDir('hish_linux_vm');
    const EMULATORS_FILE = CONFIG_DIR + '/emulators.json';
    let emulators: Map<string, Emulator> = new Map();

    // ------------------------------------------------------------------------
    // Internal Helpers
    // ------------------------------------------------------------------------

    async function loadEmulators(): Promise<void> {
        const fileStat = await Tools.Files.exists(EMULATORS_FILE);
        if (fileStat.exists) {
            const data = await Tools.Files.read(EMULATORS_FILE);
            const list = dataUtils.parseJson(data.content);
            emulators = new Map();
            for (const emu of list) {
                emu.status = 'stopped';
                emu.sessionId = undefined;
                emu.pid = undefined;
                emulators.set(emu.id, emu);
            }
        }
    }

    async function saveEmulators(): Promise<void> {
        const list = Array.from(emulators.values());
        await Tools.Files.write(EMULATORS_FILE, dataUtils.stringifyJson(list));
    }

    function generateId(): string {
        return 'emu_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    }

    function getEmulatorDir(emulatorId: string): string {
        return CONFIG_DIR + '/' + emulatorId;
    }

    // ------------------------------------------------------------------------
    // QEMU Command Builder - Based on HiSH entry/src/main/ets/lib/startVm.ets
    // ------------------------------------------------------------------------

    function buildQemuCommand(emu: Emulator): string[] {
        const baseDir = getEmulatorDir(emu.id);
        const sharedFolderOption = emu.sharedFolderReadonly ? ",readonly" : "";
        const root = emu.rootVda || '/dev/sda';

        const basic = [
            '-machine', 'virt,acpi=on,gic-version=max,' +
                'iommu=none,its=off,usb=off,virtualization=off,memory-backend=mem0,compact-highmem=on,' +
                'dump-guest-core=off,mem-merge=off,hmat=off',
            '-overcommit', 'cpu-pm=off',
            '-cpu', 'max,pauth-impdef=on,sve=off,pmu=off',
            '-accel', 'tcg,thread=multi,tb-size=2048',
            '-object', 'rng-random,filename=/dev/urandom,id=rng0',
            '-device', 'virtio-rng-pci-non-transitional,rng=rng0',
            '-rtc', 'base=utc,clock=host',
            '-L', baseDir
        ];

        const serial = ['-serial', 'unix:' + emu.serialSocket + ',server,nowait'];

        const cpuMem = [
            '-smp', `cpus=${emu.cpu},sockets=1,cores=${emu.cpu},threads=1`,
            '-object', `memory-backend-ram,id=mem0,size=${emu.memory}M,merge=off,prealloc=off`,
            '-m', emu.memory + 'M'
        ];

        const kernel = ['-kernel', emu.kernelPath];

        const network = [
            '-global', 'virtio-net-pci.ctrl_guest_offloads=off',
            '-global', 'virtio-net-pci.packed=on',
            '-device', 'virtio-net-pci-non-transitional,' +
                'netdev=eth0,csum=on,gso=on,guest_tso4=on,guest_tso6=on,guest_ecn=off,mrg_rxbuf=on,tx=bh',
            '-netdev', 'user,id=eth0' + emu.portMapping.map(pm => `,hostfwd=tcp::${pm.host}-:${pm.guest}`).join('')
        ];

        const shared = [
            '-fsdev', 'local,security_model=mapped-file,id=fsdev0,path=' + emu.sharedFolder + sharedFolderOption,
            '-device', 'virtio-9p-pci,id=fs0,fsdev=fsdev0,mount_tag=hostshare'
        ];

        const drive = [
            '-global', 'virtio-blk-pci.scsi=off',
            '-global', 'virtio-scsi-pci.cmd_per_lun=128',
            '-global', 'virtio-scsi-pci.packed=on',
            '-drive', 'if=none,format=qcow2,file=' + emu.rootFilesystem + ',id=hd0,cache=writeback,aio=threads,discard=unmap',
            '-object', 'iothread,id=iothread0,poll-max-ns=2000000',
            '-device', 'virtio-scsi-pci-non-transitional,id=scsi0,num_queues=' + emu.cpu.toString() + ',virtqueue_size=256,iothread=iothread0',
            '-device', 'scsi-hd,drive=hd0,bus=scsi0.0,logical_block_size=4096,physical_block_size=4096,rotation_rate=1,bootindex=1'
        ];

        const extraDisks: string[] = [];
        for (const disk of emu.disks || []) {
            const fmt = disk.format || 'qcow2';
            extraDisks.push(
                '-drive', `if=none,format=${fmt},file=${disk.path},id=${disk.id},cache=writeback,aio=threads`,
                '-device', `scsi-hd,drive=${disk.id},bus=scsi0.0`
            );
        }

        const kernelParam = [
            '-append',
            'root=' + root + ' rw rootfstype=ext4 rootwait console=tty0 console=ttyAMA0 consoleblank=0 ' +
                'elevator=noop skew_tick=1 acpi=on ' +
                'mitigations=off audit=0 nmi_watchdog=0 hardened_usercopy=off random.trust_cpu=on virtio_balloon.config_impl=0 ' +
                'security=none selinux=0 apparmor=0 psi=0 page_alloc.shuffle=0 swiotlb=noforce idle=halt ' +
                'cpuidle.off=1 transparent_hugepage=always pci=noaer scsi_mod.use_blk_mq=1 rng_core.default_quality=1000 ' +
                'systemd.mask=run-lock.mount systemd.mask=sys-kernel-debug.mount systemd.mask=dev-hugepages.mount ' +
                'cryptomgr.notests rodata=off rcupdate.rcu_cpu_stall_timeout=60 ' +
                'rcu_expedited=1 init_on_free=0 init_on_alloc=1 page_poison=0 slub_debug=- ' +
                'TERM=xterm init=' + emu.init
        ];

        const monitor = ['-qmp', 'unix:' + emu.qmpSocket + ',server,nowait'];

        const qga = [
            '-device', 'virtio-serial-pci-non-transitional,id=virtio-serial0',
            '-chardev', 'socket,path=' + emu.qgaSocket + ',server=on,wait=off,id=qga0',
            '-device', 'virtserialport,chardev=qga0,bus=virtio-serial0.0,name=org.qemu.guest_agent.0'
        ];

        const vnc: string[] = emu.vncEnabled ? [
            '-vnc', `${emu.vncPortMode === 'lan' ? '0.0.0.0' : '127.0.0.1'}:${emu.vncPort - 5900}`,
            '-device', 'virtio-gpu-pci',
            '-device', 'virtio-keyboard-pci',
            '-device', 'virtio-tablet-pci'
        ] : [];

        return [
            'qemu-system-aarch64',
            ...basic,
            ...serial,
            ...cpuMem,
            ...kernel,
            ...network,
            ...shared,
            ...drive,
            ...extraDisks,
            ...kernelParam,
            ...monitor,
            ...qga,
            ...vnc
        ];
    }

    // ------------------------------------------------------------------------
    // Pre-launch cleanup
    // ------------------------------------------------------------------------

    async function cleanupSockets(emu: Emulator): Promise<void> {
        const sockets = [emu.serialSocket, emu.qmpSocket, emu.qgaSocket];
        for (const sock of sockets) {
            try {
                const stat = await Tools.Files.exists(sock);
                if (stat.exists) {
                    await Tools.Files.deleteFile(sock);
                }
            } catch (e) {
                // ignore
            }
        }
    }

    // ------------------------------------------------------------------------
    // Terminal Session Management
    // ------------------------------------------------------------------------

    async function ensureTerminalSession(emu: Emulator): Promise<string> {
        if (emu.sessionId) {
            try {
                await Tools.System.terminal.screen(emu.sessionId);
                return emu.sessionId;
            } catch (e) {
                // Session expired, create new
            }
        }
        const result = await Tools.System.terminal.create('hish_' + emu.id);
        emu.sessionId = result.sessionId;
        return result.sessionId;
    }

    async function execInVm(emu: Emulator, command: string, timeoutMs?: number): Promise<CommandResult> {
        const sessionId = await ensureTerminalSession(emu);
        const result = await Tools.System.terminal.exec(sessionId, command, timeoutMs || 30000);
        return {
            exitCode: result.exitCode,
            output: result.output,
            timedOut: result.timedOut
        };
    }

    // ------------------------------------------------------------------------
    // Tool Implementations
    // ------------------------------------------------------------------------

    async function create_emulator(params: {
        name: string;
        cpu?: number;
        memory?: number;
        rootfs_path: string;
        kernel_path: string;
    }): Promise<{ success: boolean; message: string; data?: { emulatorId: string } }> {
        await loadEmulators();

        const id = generateId();
        const baseDir = getEmulatorDir(id);
        const serialSocket = baseDir + '/serial.sock';
        const qmpSocket = baseDir + '/qmp.sock';
        const qgaSocket = baseDir + '/qga.sock';
        const sharedFolder = baseDir + '/shared';

        const emulator: Emulator = {
            id,
            name: params.name,
            cpu: params.cpu || 1,
            memory: params.memory || 512,
            init: '/sbin/init',
            portMapping: [],
            rootVda: '/dev/sda',
            rootFilesystem: params.rootfs_path,
            kernelPath: params.kernel_path,
            sharedFolderReadonly: false,
            sharedFolder,
            serialSocket,
            qmpSocket,
            qgaSocket,
            vncEnabled: false,
            vncPortMode: 'local',
            vncPort: 5900,
            disks: [],
            status: 'stopped'
        };

        emulators.set(id, emulator);
        await saveEmulators();

        await Tools.Files.mkdir(baseDir);
        await Tools.Files.mkdir(sharedFolder);

        return { success: true, message: `模拟器 "${params.name}" 创建成功 (ID: ${id})`, data: { emulatorId: id } };
    }

    async function list_emulators(): Promise<{ success: boolean; data: Array<{ id: string; name: string; cpu: number; memory: number; status: string; rootFilesystem: string }> }> {
        await loadEmulators();
        const list = Array.from(emulators.values()).map(emu => ({
            id: emu.id,
            name: emu.name,
            cpu: emu.cpu,
            memory: emu.memory,
            status: emu.status,
            rootFilesystem: emu.rootFilesystem
        }));
        return { success: true, data: list };
    }

    async function delete_emulator(params: { emulator_id: string }): Promise<{ success: boolean; message: string }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }
        if (emu.status === 'running') {
            return { success: false, message: '请先停止虚拟机后再删除' };
        }
        emulators.delete(params.emulator_id);
        await saveEmulators();
        return { success: true, message: `模拟器 ${emu.name} 已删除` };
    }

    async function start_vm(params: { emulator_id: string }): Promise<{ success: boolean; message: string; data?: VMStatus }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }
        if (emu.status === 'running') {
            return { success: false, message: '虚拟机已在运行中' };
        }

        emu.status = 'starting';
        await saveEmulators();

        const qemuArgs = buildQemuCommand(emu);
        const qemuCommand = qemuArgs.join(' ');
        const logFile = getEmulatorDir(emu.id) + '/qemu.log';

        try {
            await cleanupSockets(emu);

            const sessionResult = await Tools.System.terminal.create('hish_' + emu.id);
            emu.sessionId = sessionResult.sessionId;

            const pidFile = getEmulatorDir(emu.id) + '/qemu.pid';
            await Tools.System.terminal.exec(emu.sessionId, `nohup ${qemuCommand} > ${logFile} 2>&1 & echo $! > ${pidFile}`, 5000);

            await Tools.System.sleep(4000);

            const pidResult = await Tools.System.terminal.exec(emu.sessionId, `cat ${pidFile} 2>/dev/null || echo "NOT_FOUND"`, 5000);
            if (pidResult.output.includes('NOT_FOUND') || !pidResult.output.trim()) {
                emu.status = 'error';
                emu.sessionId = undefined;
                await saveEmulators();
                return { success: false, message: 'QEMU 启动失败，请调用 get_qemu_logs 查看日志' };
            }

            const pid = parseInt(pidResult.output.trim());

            // Verify QMP socket is ready
            let qmpReady = false;
            for (let i = 0; i < 5; i++) {
                await Tools.System.sleep(1000);
                const qmpCheck = await Tools.System.terminal.hiddenExec(
                    `[ -S ${emu.qmpSocket} ] && echo "READY" || echo "WAITING"`,
                    { executorKey: 'hish_qmp_check', timeoutMs: 3000 }
                );
                if (qmpCheck.output.trim() === 'READY') {
                    qmpReady = true;
                    break;
                }
            }

            emu.status = qmpReady ? 'running' : 'error';
            emu.pid = pid;
            emu.uptime = Date.now();
            await saveEmulators();

            if (!qmpReady) {
                return { success: false, message: `QEMU 进程已启动 (PID: ${pid})，但 QMP 监控接口未就绪，请检查日志` };
            }

            return {
                success: true,
                message: `虚拟机 ${emu.name} 启动成功 (PID: ${pid})`,
                data: {
                    emulatorId: emu.id,
                    status: emu.status,
                    message: '运行中',
                    pid: emu.pid,
                    uptime: emu.uptime
                }
            };
        } catch (error) {
            emu.status = 'error';
            emu.sessionId = undefined;
            await saveEmulators();
            return { success: false, message: `启动失败: ${(error as Error).message}` };
        }
    }

    async function stop_vm(params: { emulator_id: string }): Promise<{ success: boolean; message: string; data?: VMStatus }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }
        if (emu.status !== 'running') {
            return { success: false, message: '虚拟机未在运行' };
        }

        try {
            if (emu.sessionId) {
                const qmpQuitResult = await Tools.System.terminal.exec(
                    emu.sessionId,
                    `echo '{"execute": "quit"}' | socat - UNIX-CONNECT:${emu.qmpSocket} 2>&1 || echo "SOCK_FAIL"`,
                    5000
                );

                if (qmpQuitResult.output.includes('SOCK_FAIL')) {
                    if (emu.pid) {
                        await Tools.System.terminal.exec(emu.sessionId, `kill -0 ${emu.pid} 2>/dev/null && kill -9 ${emu.pid} || true`, 3000);
                    }
                } else {
                    await Tools.System.sleep(2000);
                    if (emu.pid) {
                        const checkResult = await Tools.System.terminal.exec(
                            emu.sessionId,
                            `kill -0 ${emu.pid} 2>/dev/null && echo "ALIVE" || echo "DEAD"`,
                            3000
                        );
                        if (checkResult.output.trim() === 'ALIVE') {
                            await Tools.System.terminal.exec(emu.sessionId, `kill -9 ${emu.pid} 2>/dev/null || true`, 3000);
                        }
                    }
                }

                await Tools.System.terminal.close(emu.sessionId);
            } else if (emu.pid) {
                await Tools.System.terminal.hiddenExec(
                    `kill -9 ${emu.pid} 2>/dev/null || true`,
                    { executorKey: 'hish_kill', timeoutMs: 3000 }
                );
            }
        } catch (e) {
            // Ignore cleanup errors
        }

        emu.status = 'stopped';
        emu.sessionId = undefined;
        emu.pid = undefined;
        emu.uptime = undefined;
        await saveEmulators();

        return {
            success: true,
            message: `虚拟机 ${emu.name} 已停止`,
            data: {
                emulatorId: emu.id,
                status: 'stopped',
                message: '已停止'
            }
        };
    }

    async function get_vm_status(params: { emulator_id: string }): Promise<{ success: boolean; data: VMStatus }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return {
                success: false,
                data: {
                    emulatorId: params.emulator_id,
                    status: 'error',
                    message: '模拟器不存在'
                }
            };
        }

        if (emu.status === 'running' && emu.pid) {
            try {
                const result = await Tools.System.terminal.hiddenExec(
                    `kill -0 ${emu.pid} 2>/dev/null && echo "ALIVE" || echo "DEAD"`,
                    { executorKey: 'hish_status_check', timeoutMs: 3000 }
                );
                if (result.output.trim() === 'DEAD') {
                    emu.status = 'stopped';
                    emu.pid = undefined;
                    emu.sessionId = undefined;
                    await saveEmulators();
                }
            } catch (e) {
                // Ignore
            }
        }

        return {
            success: true,
            data: {
                emulatorId: emu.id,
                status: emu.status,
                message: emu.status === 'running' ? '运行中' : emu.status === 'starting' ? '启动中' : emu.status === 'error' ? '错误' : '已停止',
                pid: emu.pid,
                uptime: emu.uptime
            }
        };
    }

    async function configure_port_mapping(params: {
        emulator_id: string;
        host_port: number;
        guest_port: number;
    }): Promise<{ success: boolean; message: string }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }

        const existing = emu.portMapping.find(pm => pm.host === params.host_port);
        if (existing) {
            existing.guest = params.guest_port;
        } else {
            emu.portMapping.push({ host: params.host_port, guest: params.guest_port });
        }
        await saveEmulators();

        return { success: true, message: `端口转发规则已配置: 主机 ${params.host_port} -> 客户机 ${params.guest_port}` };
    }

    async function list_port_mappings(params: { emulator_id: string }): Promise<{ success: boolean; data: PortMapping[] }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, data: [] };
        }
        return { success: true, data: emu.portMapping };
    }

    async function remove_port_mapping(params: { emulator_id: string; host_port: number }): Promise<{ success: boolean; message: string }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }

        const idx = emu.portMapping.findIndex(pm => pm.host === params.host_port);
        if (idx === -1) {
            return { success: false, message: `未找到主机端口 ${params.host_port} 的转发规则` };
        }

        emu.portMapping.splice(idx, 1);
        await saveEmulators();
        return { success: true, message: `端口转发规则 ${params.host_port} 已删除` };
    }

    async function execute_command(params: {
        emulator_id: string;
        command: string;
        timeout_ms?: number;
    }): Promise<{ success: boolean; data: CommandResult }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, data: { exitCode: -1, output: '模拟器不存在' } };
        }
        if (emu.status !== 'running') {
            return { success: false, data: { exitCode: -1, output: '虚拟机未运行' } };
        }

        const result = await execInVm(emu, params.command, params.timeout_ms);
        return { success: result.exitCode === 0, data: result };
    }

    async function get_system_info(params: { emulator_id: string }): Promise<{ success: boolean; data: SystemInfo }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu || emu.status !== 'running') {
            return {
                success: false,
                data: {
                    cpu: { model: '', cores: 0, usage: 0 },
                    memory: { total: 0, used: 0, available: 0 },
                    disk: { total: 0, used: 0, available: 0 },
                    os: '', kernel: '', hostname: '', uptime: ''
                }
            };
        }

        const cpuResult = await execInVm(emu, 'cat /proc/cpuinfo | grep "model name" | head -1 | cut -d: -f2 | xargs', 5000);
        const memResult = await execInVm(emu, "free -m | awk 'NR==2{print $2,$3,$7}'", 5000);
        const diskResult = await execInVm(emu, "df -B1 / | awk 'NR==2{print $2,$3,$4}'", 5000);
        const osResult = await execInVm(emu, 'cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d \'"\'', 5000);
        const kernelResult = await execInVm(emu, 'uname -r', 5000);
        const hostnameResult = await execInVm(emu, 'hostname', 5000);
        const uptimeResult = await execInVm(emu, 'uptime -p', 5000);

        const memParts = memResult.output.trim().split(' ');
        const diskParts = diskResult.output.trim().split(' ');

        return {
            success: true,
            data: {
                cpu: {
                    model: cpuResult.output.trim() || 'ARM64',
                    cores: emu.cpu,
                    usage: 0
                },
                memory: {
                    total: parseInt(memParts[0]) || 0,
                    used: parseInt(memParts[1]) || 0,
                    available: parseInt(memParts[2]) || 0
                },
                disk: {
                    total: parseInt(diskParts[0]) || 0,
                    used: parseInt(diskParts[1]) || 0,
                    available: parseInt(diskParts[2]) || 0
                },
                os: osResult.output.trim() || 'Linux',
                kernel: kernelResult.output.trim(),
                hostname: hostnameResult.output.trim(),
                uptime: uptimeResult.output.trim()
            }
        };
    }

    async function get_process_list(params: { emulator_id: string }): Promise<{ success: boolean; data: ProcessInfo[] }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu || emu.status !== 'running') {
            return { success: false, data: [] };
        }

        const result = await execInVm(emu, 'ps aux | tail -n +2', 5000);
        const lines = result.output.trim().split('\n').filter(line => line.trim());

        const processes: ProcessInfo[] = lines.map(line => {
            const parts = line.trim().split(/\s+/);
            return {
                pid: parseInt(parts[1]) || 0,
                name: parts[10] || '',
                user: parts[0] || '',
                cpu: parseFloat(parts[2]) || 0,
                memory: parseFloat(parts[3]) || 0,
                status: parts[7] || ''
            };
        });

        return { success: true, data: processes.slice(0, 30) };
    }

    async function upload_file(params: {
        emulator_id: string;
        local_path: string;
        remote_path: string;
    }): Promise<{ success: boolean; message: string }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }

        const content = await Tools.Files.read(params.local_path);
        await Tools.Files.write(params.remote_path, content.content, false, 'linux');

        return { success: true, message: `文件上传成功: ${params.local_path} -> ${params.remote_path}` };
    }

    async function download_file(params: {
        emulator_id: string;
        remote_path: string;
        local_path: string;
    }): Promise<{ success: boolean; message: string }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }

        const content = await Tools.Files.read(params.remote_path);
        await Tools.Files.write(params.local_path, content.content, false, 'android');

        return { success: true, message: `文件下载成功: ${params.remote_path} -> ${params.local_path}` };
    }

    async function install_package(params: {
        emulator_id: string;
        package_name: string;
        package_manager?: string;
    }): Promise<{ success: boolean; message: string }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu || emu.status !== 'running') {
            return { success: false, message: '虚拟机未运行' };
        }

        const pm = params.package_manager || 'apk';
        let command = '';

        if (pm === 'apt') {
            command = `apt-get update && apt-get install -y ${params.package_name}`;
        } else {
            command = `apk add ${params.package_name}`;
        }

        const result = await execInVm(emu, command, 120000);

        if (result.exitCode === 0) {
            return { success: true, message: `软件包 ${params.package_name} 安装成功` };
        } else {
            return { success: false, message: `安装失败: ${result.output}` };
        }
    }

    async function configure_vnc(params: {
        emulator_id: string;
        enabled: boolean;
        port_mode?: string;
        port?: number;
    }): Promise<{ success: boolean; message: string }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }
        if (emu.status === 'running') {
            return { success: false, message: '请先停止虚拟机再修改 VNC 配置' };
        }

        emu.vncEnabled = params.enabled;
        if (params.port_mode) {
            emu.vncPortMode = params.port_mode === 'lan' ? 'lan' : 'local';
        }
        if (params.port) {
            emu.vncPort = params.port;
        }
        await saveEmulators();

        const msg = params.enabled
            ? `VNC 已启用 (${emu.vncPortMode} 模式, 端口 ${emu.vncPort})`
            : 'VNC 已禁用';
        return { success: true, message: msg };
    }

    async function get_vnc_info(params: { emulator_id: string }): Promise<{ success: boolean; data: { enabled: boolean; host: string; port: number; display: number } }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, data: { enabled: false, host: '', port: 0, display: 0 } };
        }

        return {
            success: true,
            data: {
                enabled: emu.vncEnabled,
                host: emu.vncPortMode === 'lan' ? '0.0.0.0' : '127.0.0.1',
                port: emu.vncPort,
                display: emu.vncPort - 5900
            }
        };
    }

    async function add_disk_drive(params: {
        emulator_id: string;
        image_path: string;
        format?: string;
    }): Promise<{ success: boolean; message: string }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }
        if (emu.status === 'running') {
            return { success: false, message: '请先停止虚拟机再添加磁盘' };
        }

        const diskId = 'disk_' + Date.now();
        emu.disks.push({
            id: diskId,
            path: params.image_path,
            format: params.format || 'qcow2'
        });
        await saveEmulators();

        return { success: true, message: `磁盘已添加 (ID: ${diskId})` };
    }

    async function configure_shared_folder(params: {
        emulator_id: string;
        host_path?: string;
        readonly?: boolean;
    }): Promise<{ success: boolean; message: string }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, message: `模拟器 ${params.emulator_id} 不存在` };
        }
        if (emu.status === 'running') {
            return { success: false, message: '请先停止虚拟机再修改共享文件夹配置' };
        }

        if (params.host_path) {
            emu.sharedFolder = params.host_path;
        }
        if (typeof params.readonly === 'boolean') {
            emu.sharedFolderReadonly = params.readonly;
        }
        await saveEmulators();

        return { success: true, message: `共享文件夹已配置: ${emu.sharedFolder} (只读: ${emu.sharedFolderReadonly})` };
    }

    async function get_qemu_logs(params: { emulator_id: string; lines?: number }): Promise<{ success: boolean; data: { logs: string } }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, data: { logs: '' } };
        }

        const logFile = getEmulatorDir(emu.id) + '/qemu.log';
        try {
            const stat = await Tools.Files.exists(logFile);
            if (!stat.exists) {
                return { success: true, data: { logs: '暂无日志文件' } };
            }
            const content = await Tools.Files.read(logFile);
            const allLines = content.content.split('\n');
            const lineCount = params.lines || 100;
            const logs = allLines.slice(-lineCount).join('\n');
            return { success: true, data: { logs } };
        } catch (e) {
            return { success: false, data: { logs: `读取日志失败: ${(e as Error).message}` } };
        }
    }

    async function get_qemu_command(params: { emulator_id: string }): Promise<{ success: boolean; data: { command: string } }> {
        await loadEmulators();
        const emu = emulators.get(params.emulator_id);
        if (!emu) {
            return { success: false, data: { command: '' } };
        }

        const args = buildQemuCommand(emu);
        return { success: true, data: { command: args.join(' ') } };
    }

    // ------------------------------------------------------------------------
    // Wrapper with error handling
    // ------------------------------------------------------------------------

    async function wrap<T>(func: (params: any) => Promise<T>, params: any): Promise<void> {
        try {
            const result = await func(params);
            complete(result);
        } catch (error) {
            complete({ success: false, message: `执行失败: ${(error as Error).message}` });
        }
    }

    return {
        create_emulator: (params: any) => wrap(create_emulator, params),
        list_emulators: (params: any) => wrap(list_emulators, params),
        delete_emulator: (params: any) => wrap(delete_emulator, params),
        start_vm: (params: any) => wrap(start_vm, params),
        stop_vm: (params: any) => wrap(stop_vm, params),
        get_vm_status: (params: any) => wrap(get_vm_status, params),
        configure_port_mapping: (params: any) => wrap(configure_port_mapping, params),
        list_port_mappings: (params: any) => wrap(list_port_mappings, params),
        remove_port_mapping: (params: any) => wrap(remove_port_mapping, params),
        execute_command: (params: any) => wrap(execute_command, params),
        get_system_info: (params: any) => wrap(get_system_info, params),
        get_process_list: (params: any) => wrap(get_process_list, params),
        upload_file: (params: any) => wrap(upload_file, params),
        download_file: (params: any) => wrap(download_file, params),
        install_package: (params: any) => wrap(install_package, params),
        configure_vnc: (params: any) => wrap(configure_vnc, params),
        get_vnc_info: (params: any) => wrap(get_vnc_info, params),
        add_disk_drive: (params: any) => wrap(add_disk_drive, params),
        configure_shared_folder: (params: any) => wrap(configure_shared_folder, params),
        get_qemu_logs: (params: any) => wrap(get_qemu_logs, params),
        get_qemu_command: (params: any) => wrap(get_qemu_command, params)
    };
})();

exports.create_emulator = HiSHPlugin.create_emulator;
exports.list_emulators = HiSHPlugin.list_emulators;
exports.delete_emulator = HiSHPlugin.delete_emulator;
exports.start_vm = HiSHPlugin.start_vm;
exports.stop_vm = HiSHPlugin.stop_vm;
exports.get_vm_status = HiSHPlugin.get_vm_status;
exports.configure_port_mapping = HiSHPlugin.configure_port_mapping;
exports.list_port_mappings = HiSHPlugin.list_port_mappings;
exports.remove_port_mapping = HiSHPlugin.remove_port_mapping;
exports.execute_command = HiSHPlugin.execute_command;
exports.get_system_info = HiSHPlugin.get_system_info;
exports.get_process_list = HiSHPlugin.get_process_list;
exports.upload_file = HiSHPlugin.upload_file;
exports.download_file = HiSHPlugin.download_file;
exports.install_package = HiSHPlugin.install_package;
exports.configure_vnc = HiSHPlugin.configure_vnc;
exports.get_vnc_info = HiSHPlugin.get_vnc_info;
exports.add_disk_drive = HiSHPlugin.add_disk_drive;
exports.configure_shared_folder = HiSHPlugin.configure_shared_folder;
exports.get_qemu_logs = HiSHPlugin.get_qemu_logs;
exports.get_qemu_command = HiSHPlugin.get_qemu_command;
