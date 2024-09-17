# SPDX-FileCopyrightText: 2024 Jacob K
#
# SPDX-License-Identifier: CC0-1.0

mkdir -p build
hydrilla-builder --dstdir build
hydrilla-server --malcontent-dir build
